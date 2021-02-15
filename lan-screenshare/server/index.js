var http = require("http");
var express = require("express");
var path = require('path');
var net = require("net");
var cors = require("cors");
var app = express();
var io = require("socket.io");
var Queue = require("./queue");
// var file_data = require("./filereader");

const port = 5000;
var server = http.createServer(app);
var soi = io(server);

app.use(cors());
app.use( express.static( __dirname + '/public' ));

app.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public', "index.html"));
});

var buff = new Queue(10); // TODO

// --------- internal-img-data-transport ---------
var stream_itr = 1; var str_data = "", sdata = "";
var client = new net.Socket();
client.connect(9898, '127.0.0.1', function() {
	console.log('CONNECTED : img-data-channel');
});
var header_length = 10; // header_length
client.on('data', function(data) {
    str_data = String.fromCharCode.apply(null, data);
    head = str_data.substring(0,header_length);
    // console.log("Head : ", head);
    if(head.substring(0,1) === "#"){
        buff.push_data(sdata);
        // console.log("Pushed :", typeof(sdata), " size : ", sdata.length);
        sdata = str_data.substring(header_length, str_data.length);
    }
    else{
        sdata += str_data; 
    }
});

client.on('close', function() {
	console.log('DISCONNECTED : img-data-channel');
});

setInterval(() => {
    client.write('give img-data');
}, 1);

// -------- Web socket Protocol with client ---------
var ping = 50;

soi.on("connection", (socket) => {
    console.log("SID : ", socket.id);
    socket.on("client-data", (args) => {
        // console.log("R: ", args);
    });
    setInterval(() => {
        socket.emit("server-data", buff.get_last_data());
    }, ping);
});

server.listen(port);
console.log("Listening on port : ", port);