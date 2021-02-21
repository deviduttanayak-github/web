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
var rooms = [];     var ping = 50;
var last_visit = 0;

// --------- internal-img-data-transport ---------
var stream_itr = 1; var str_data = "", sdata = "";
var client = new net.Socket();


client.connect(9898, '127.0.0.1', function(err) {
    console.log('CONNECTED : img-data-channel');
});
client.on("error", (e)=> {
    console.log("[ERR] : Connection Failed - img-data-channel");
});

var header_length = 10; // header_length
client.on('data', function(data) {
    str_data = String.fromCharCode.apply(null, data);
    head = str_data.substring(0,header_length);
    if(head.substring(0,1) === "#"){
        buff.push_data(sdata);
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

soi.on("connection", (socket) => {
    console.log("SID : ", socket.id);
    socket.on("client-data", (args) => {
        socket.emit("server-data", buff.get_last_data());
        last_visit = new Date().getTime();
    });

    // --------- web socket Protocol with client - text channel -------
    socket.on("create-room", (room_id) => {
        var rid =  room_id.split("#")[0];
        // console.log("RID : ", rid);
        socket.join(rid);
        rooms.push([rid, socket.id]);
        socket.emit("create-room-res", "done");
    });
    socket.on("join-req", (token)=> { 
        var f = true;
        for( var i=0; i<rooms.length; i++){
            if(rooms[i][0] == token){
                socket.join(token);
                f = false;  break;
            }
        }        
        if(f) socket.emit("forwarded-text", "[SERVER] : No such room with this ID exists.");
    });
    socket.on("forward-text", (packet) => {
        let data_indx = packet.split("#")[0].length + 1; 
        let msg = packet.substring(data_indx, packet.length );
        let room = packet.split("#")[0];
        // console.log("Room : ", room); 
        // console.log("Data : ", msg );        
        soi.sockets.in(room).emit("forwarded-text", msg);
    });
});


server.listen(port);
console.log("Listening on port : ", port);