import React, {useState, useEffect} from 'react'
import axios from 'axios';
import status from '../../status'
import './style.css';
import { baseUrl } from '../../conf';

function Topic(props) {
    // console.log(props);
    const [replynow, setreplynow] = useState(false);
    const [resp, setresp] = useState("")
    var reply = "";
    
    const replyNow = (e) => { 
        setreplynow(true)
    };
    
    const sendReply =(e) => {
        var id = e.target.id; var usr = (status.getUser()=="")?"unknown":status.getUser();
        console.log( id, " ", { "username": usr, "reply":reply } );
        axios.post(baseUrl+'/reply', { "id": id, "data": { "username": usr, "reply":reply }  })
            .then( res =>{
                console.log(res.data);
                setresp(res.data);
            })
            .catch( er =>{
                console.log(res);
            })
    };

    return (
        <div className="topic-wrap">
            <div id={props.id} className="topic">
                {props.topic}
            </div>
            <TopicWrap id={props.id} replies={props.replies} /> <br />
            {
                replynow && (
                    <div id="reply-now-1">
                        <input type="text" onChange={ (e=>{
                            reply = e.target.value;
                        })} />
                        <button id={props.id} onClick={sendReply}>submit</button>
                    </div>
            )}
            {
                resp!="" && ( 
                    <i>{resp}</i>
                )
            }

            { !replynow && (
            <div className="reply-now">
                <button onClick={replyNow} >reply</button>
            </div>
            )}
            
        </div>
    )
};

const TopicReplies = (props) => {
    // console.log("r : ", props)
    return(
        <div id={props.id} className="reply">
                <div className="replier-name">
                    {props.username}
                </div>
                <div className="reply-body">
                    {props.reply}
                </div>
            </div>
    )
};

const TopicWrap = (props) =>{
    // console.log("TW: ", props.replies)
    return (    <div>             
        {
            props.replies.map( element => {
                return(
                    <div>
                    <TopicReplies id={props.id} username={element.username} reply={element.reply} /> 
                    <br />
                    </div>
                  )      
            })
        }
        </div>
    )
}

export default Topic
