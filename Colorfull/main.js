
$(document).ready( ()=> {
    console.log("Doc Loaded");
    $("#tes").css("background-color", my_colors[0]);
    $("#tes1").css("background-color", my_colors[1]);
    $("#tes2").css("background-color", my_colors[2]);
    $("#tes3").css("background-color", my_colors[3]);
    $("#tes4").css("background-color", my_colors[4]);
    $("#tes5").css("background-color", my_colors[5]);

});

var open = true;
function dia(e) {
    console.log("hi", open, " ", document.getElementById("how"))
    if(open) document.getElementById("how").show();
    else document.getElementById("how").close();
    open = !open;
}

// some vars used ----------------
var select_mode = false;
var counter = 0;
var my_colors = ["#84E727", "#E79327", "#27CDE7", "#DE27E7", "#EE3515", "black"];
var graph = new Map();
var N = 21 , mat_size;
var mat = new Array(N);
for(let i=0; i<N; i++) mat[i] = new Array(N); 
var delay = 100;

function fill_mat(id) {
    let i = id.split("-")[0], j = id.split("-")[1];
    mat[i][j] = counter;
}

$("#num_of_cells_btn").click( () => { 
    $("#root").empty();
    select_mode = false; counter = 0;
    for(let i = 0; i<N; i++){ 
        for(let j=0; j<N; j++) mat[i][j] = 0; 
    }

    let n = $("#num_of_cells").val();
    let pad = $("<div class=pad></div>");
    pad.css("--n", n );
    mat_size = n;
    if(mat_size > 20) return;
    for(let i=0; i<n; i++){
        for(let j=0; j<n; j++){
            let cell = $("<div class=cell></div>");
            cell.attr("id", i+"-"+j);
            pad.append(cell);
        }
    }
    $("#root").append(pad);

    $(".cell").click( (e)=> {
        // console.log("here");
        select_mode = !select_mode;
        if( select_mode && $("#"+e.target.id).text() == "") counter += 1;
        else return;
        document.getElementById(e.target.id).innerHTML = counter;
        fill_mat(e.target.id);
    });

    $(".cell").hover(function () { 
            if( $(this).text() != ""  && $(this).text() != counter ) select_mode = false;
            if(select_mode){
                $(this).text(counter);
                fill_mat($(this).attr("id"));
            }
        }, function () {
            // leave cell
        }
    );

    $(".pad").hover( ()=> {
        // console.log("pad-enter");
    }, () => {
        // console.log("pad-leave");
        select_mode = false;
    });

});

$("#color").click( ()=> {
    // console.log(mat);
    let vis = new Array(counter+1);
    for(let i=0; i<=counter; i++){
        graph[i] = new Set();
        vis[i] = false;
    }
    // make graph
    for(let i=0; i<mat_size; i++){
        for(let j=0; j<mat_size; j++){
            if(i+1 < mat_size && mat[i+1][j] != mat[i][j]) graph[mat[i][j]].add(mat[i+1][j]);
            if(j+1 < mat_size && mat[i][j+1] != mat[i][j]) graph[mat[i][j]].add(mat[i][j+1]);
            if(i > 0 && mat[i-1][j] != mat[i][j]) graph[mat[i][j]].add(mat[i-1][j]);
            if(j > 0 && mat[i][j-1] != mat[i][j]) graph[mat[i][j]].add(mat[i][j-1]);
        }
    }
    
    // console.log("G: ", graph);

    let my_order = new Array();
    for(let i=0; i<=counter; i++) 
        if(graph[i].size) my_order.push([graph[i].size,i]);

    my_order.sort().reverse();
    let final_colors = new Array();
    for(let i=0; i<=counter; i++) final_colors[i] = -1;

    for(let i=0; i<my_order.length; i++){
        let u = my_order[i][1];
        vis[u] = true;
        let avai_colors = [true, true, true, true, true, true];
        
        for(let v of graph[u]){
            if(final_colors[v] != -1) avai_colors[final_colors[v]] = false;
        }

        for(let j=0; j<avai_colors.length; j++){
            if(avai_colors[j]){
                final_colors[u] = j; break;
            }
        }
        if(final_colors[u] == -1){
            alert("Opps!! Something went wrong!!")
        }
    }

    // for(let i=0; i<mat_size; i++){
    //     for(let j=0; j<mat_size; j++){
    //         let id = "#"+i+"-"+j;
    //         let color_code = final_colors[mat[i][j]];
    //         // console.log("ij: ", id, " col:", color_code);
    //         // $(id).empty();
    //         $(id).css("background-color", my_colors[color_code]);
    //         $(id).css("color", "white");
    //     }
    // }
    color_mat(final_colors, my_order, 0);
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// fill one at a time
async function color_mat(fc, ord, i){
    if(i == ord.length){
        return;
    }
    else{
        let u = ord[i][1];
        // console.log("coloring : ", u);
        for(let i=0; i<mat_size; i++){
            for(let j=0; j<mat_size; j++){
                let id = "#"+i+"-"+j;
                let color_code = fc[u];
                if( u == mat[i][j]){
                    $(id).css("background-color", my_colors[color_code]);
                    $(id).css("color", "white");
                }
            }
        }    
        setTimeout(async () => {
            await color_mat(fc, ord, i+1);
        }, delay);
    }
}