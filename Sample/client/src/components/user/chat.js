import React, {useState, useEffect} from 'react'
import './style.css';
import status from '../../status';
import Load from '../common/loading';

var HOST = window.location.origin.replace(/^http/, 'ws')
var client = new WebSocket(HOST+'/chat');

function Chat() {
    // var friend = "Raju"; //var client = null;
    const [ready, setready] = useState(false);
    const [msg, setmsg] = useState("");
    const [connected, setconnected] = useState(false);
    const [friend, setfriend] = useState("");
    const [yourstatus, setyourstatus] = useState(3);
    var hasSent = false;

    useEffect(() => {
        console.log('c-s: ', client.readyState);
        // init();
        if(status.getUser()==""){
            setmsg("you need to login first");
        }
        else{
            // if(localStorage.getItem('friend')===null){
            //     alert("invalid friend username");
            // }
            // else{
                // friend = localStorage.getItem('friend'); localStorage.removeItem('friend');
                init();
            // }
        }
    }, []);

    const init = () => {  
        // console.log("host: ", HOST);
        // var c = {"status": 1 ,"id": status.getUser() };
        // client.send(JSON.stringify(c));
        // console.log(client);
        client.onopen = (e) =>{
            console.log('connected');
            var c = {"status": 1 ,"id": status.getUser()};
            client.send(JSON.stringify(c));
            if( client.readyState === 1) setyourstatus(1);
            hasSent = true;
        };
        client.onclose = (e) => {
            setyourstatus(3);
            console.log('connection-closed');
        };
        client.onmessage = (e) => {
            // console.log(e.data);
            var new_div = document.createElement("div");
            new_div.innerHTML = e.data;
            new_div.classList.add("friend");
            document.getElementById('chat-body').appendChild(new_div);
        };
        client.onerror = (e) =>{
            console.log('error: ', e);
        }
        // console.log('c-s-2: ', client.readyState);
        // var c = {"status": 1 ,"id": status.getUser()};
        // client.send(JSON.stringify(c));
        // console.log('c-s-3: ', client.readyState);
        setTimeout(() => {
            if(client.readyState===1 && !hasSent){
                var c = {"status": 1 ,"id": status.getUser()};
                client.send(JSON.stringify(c));
                setyourstatus(1);
            }
        }, 1000);
    };
    const send = (e) => {
        // console.log('c-s-4-send: ', client.readyState);
        if( client.readyState === 0) {
            alert("Not connected to server :(, try refresh");
            return;
        }
        var m = document.getElementById('usr-text').value;
        // console.log(m);
        document.getElementById('usr-text').value = "";
        var new_div = document.createElement("div");
        new_div.innerHTML = m;
        new_div.classList.add("me");
        document.getElementById('chat-body').appendChild(new_div);
        client.send( JSON.stringify( {"status": 0, "from": status.getUser(), "to": friend , "msg": m} ));
    }

    const setFriend = (e) => {
        var f = document.getElementById('set-friend').value;
        // console.log('friend: ', friend);
        setfriend(f);
    }

    return (
        <div className="root">
            <div className="head">
                {friend}
            </div>
            {
                msg!=="" && (<i>{msg}</i>)
            }
            <span>
            <b>status: </b>
            {
                yourstatus===1?<i>connected</i>:<i>not-connected to server</i>
            }
            </span>
            <div id="chat-body" className="chat-body">
                <div id="friend" className="friend">
                    Welcome {status.getUser()}, Type your friend username then click friend. 
                    Then start your conversation, provided both clients should be online
                    at the same time. 
                </div>
            </div>
            <div className="type-field">
                <input type="text" id="set-friend" className="usr-input" />
                <button onClick={setFriend} className="btn">friend</button>
                <input type="text" id="usr-text" className="usr-input" />
                <button onClick={send} className="btn">send</button>
            </div>
        </div>
    )
}

export default Chat
