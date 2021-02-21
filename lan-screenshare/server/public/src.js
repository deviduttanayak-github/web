var img_conn = false, rceived = false, txt_conn = false;
var last_changed = 0;
var meta_data = "data:image/png;base64,";
var loc = "home";  // screen-viewer
var last_loc = "home";
var token = "";  
var can_share = false;

// ---------- toggler part --------------
document.querySelector('#boom').onclick = (e) => {
    last_loc = loc;
    document.getElementById("home").style.display = 'none';
    document.getElementById("screen-viewer").style.display = 'block';
    document.getElementById("text-share").style.display = 'none';
    loc = "screen-viewer";
};
document.querySelector('#boom-text').onclick = (e) => {
    last_loc = loc;
    document.getElementById("home").style.display = 'none';
    document.getElementById("screen-viewer").style.display = 'none';
    document.getElementById("text-share").style.display = 'block';
    loc = "text-share";
};

// todo: go back button
document.querySelector("#back-btn").onclick = (e) => {
    last_loc = loc;
    document.getElementById("home").style.display = 'flex';
    document.getElementById("screen-viewer").style.display = 'none';
    document.getElementById("text-share").style.display = 'none';
    loc = "home";
}
// ---------- toggler part -------------- end

// ------------- socket io part ---------------

setInterval(() => {
    if(loc !== last_loc && loc === "screen-viewer" ) socket.emit("client-data", "Hi!! from Client-Side");
}, 1000);

const socket = io();
socket.on("reconnect_attempt", () => {
    img_conn = true;
    socket.emit("client-data", "Hi!! from Client-Side"); // test
});
socket.emit("client-data", "Hi!! from Client-Side");
socket.on("server-data", (img_data ) => {
    img_conn = true;
    document.getElementById("screen").src = meta_data+img_data ;
    if(loc === "screen-viewer")
    socket.emit("client-data", "Hi!! from Client-Side");
});
socket.on('disconnect', (reason) => {
    img_conn = false;
});

setInterval(() => {
    if(img_conn) {
        document.getElementById("status-dot").style.backgroundColor = "#9DF05C";
        document.getElementById("status").innerHTML = "connected";
        document.getElementById("status-dot-txt").style.backgroundColor = "#9DF05C";
        document.getElementById("status-txt").innerHTML = "connected";
    }
    else{
        document.getElementById("status-dot").style.backgroundColor = "red";
        document.getElementById("status").innerHTML = "connecting...";
        document.getElementById("status-dot-txt").style.backgroundColor = "red";
        document.getElementById("status-txt").innerHTML = "connecting...";
    }
    if(can_share) document.getElementById("incoming").innerHTML = "Sharing";
    else if(rceived) document.getElementById("incoming").innerHTML = "Viewing Shared text";
}, 1000);

// ------------- socket io part --------------- end --

// ------------- text-editor ------------------
/*
function onKeyUp(e){
    //detect 'tab' key
    if(e.keyCode == 9){
        //add tab
        console.log("Tab-pressed");
        document.getElementById("text-box-left").innerHTML += '&#009';
        //prevent focusing on next element
        e.preventDefault();   
    }
}
*/
// source : stack-overflow
function onKeyDown(e) {
    var curr = new Date().getTime();
    if(curr - last_changed >= 2000) socket.emit("forward-text", buildMsg(token, document.getElementById("text-box-left").innerHTML));

    last_changed = new Date().getTime();
    // console.log("T : ", last_changed)
    if (e.keyCode === 9) { // tab key
        e.preventDefault();  // this will prevent us from tabbing out of the editor
        // now insert four non-breaking spaces for the tab key
        var editor = document.getElementById("text-box-left");
        var doc = editor.ownerDocument.defaultView;
        var sel = doc.getSelection();
        var range = sel.getRangeAt(0);

        var tabNode = document.createTextNode("\u00a0\u00a0\u00a0\u00a0");
        range.insertNode(tabNode);

        range.setStartAfter(tabNode);
        range.setEndAfter(tabNode); 
        sel.removeAllRanges();
        sel.addRange(range);
    }
}
const buildMsg = (tok, txt) => {
    return (tok + "#" + txt);
};

document.querySelector("#text-setter").onclick = (e) => {
    var size = document.getElementById("txt-size").value;
    var color =  document.getElementById("txt-color").value;
    document.getElementById("text-box-left").style.fontSize = size+"rem";
    document.getElementById("text-box-left").style.color = color;
}

document.querySelector("#share-txt").onclick = (e) => {
    token = document.getElementById("token-text-share").value;
    socket.emit("create-room", token);
    setTimeout(() => {
        socket.emit("forward-text", buildMsg(token, " " ));
    }, 1000);
};

document.querySelector("#join-txt").onclick = (e) => {
    socket.emit("join-req", document.getElementById("token-text").value);
    can_share = false;
}

socket.on("create-room-res", (res) => {
    if(res == "done"){
        can_share = true;
    }
    else can_share = false;
    // console.log("Res : ", res, " ", can_share);
});

socket.on("forwarded-text", (data) =>{
    // console.log("D: ", data);
    rceived = true;
    if(!can_share)
    document.getElementById("text-box-left").innerHTML = data;
    else 
    setTimeout(() => {
        var curr = new Date().getTime();
        if( curr-last_changed < 2000)
        socket.emit("forward-text", buildMsg(token, document.getElementById("text-box-left").innerHTML));
    }, 500);
});
// setInterval(() => {
//     if(can_share)
//     socket.emit("forward-text", document.getElementById("text-box-left").innerHTML);
// }, 500);