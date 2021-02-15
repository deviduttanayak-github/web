// ---------- toggler part --------------
var loc = "home";  // screen-viewer
document.querySelector('#boom').onclick = (e) => {
    console.log("clicked");
    document.getElementById("home").style.display = 'none';
    document.getElementById("screen-viewer").style.display = 'block';
    loc = "screen-viewer";
}

// todo: go back button

// ---------- toggler part -------------- end

// var test = [2];
// test[0] = "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO";
// test[1] = "9TXL0Y4OHwAAAABJRU5ErkJggg==";

var meta_data = "data:image/png;base64,";
var img_data = "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";

const displayImg = () => {
    document.getElementById("screen").src = meta_data+img_data ;
}

// displayImg();

// ------------- socket io part ---------------
const socket = io();
socket.on("reconnect_attempt", () => {
    console.log("socket");
});

socket.emit("client-data", "Hi!! from Client-Side");
socket.on("server-data", (img_data ) => {
    console.log("R : ", typeof(img_data));
    document.getElementById("screen").src = meta_data+img_data ;
})

// ------------- socket io part --------------- end --