import Axios from 'axios';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Load from '../common/loading';
import Button from '@material-ui/core/Button';
import status from '../../status';
import Topic from './topic';
import './style.css';
import { baseUrl } from '../../conf';

var t = {};  
var topics = [];
// var topics = { "id":"1", "topic":"Is it working?", 
// "replies":[{"username":"devi", "reply":"yesss"}, {"username":"devi_new", "reply":"hell yeah"}] }
var sub = "";

function Discuss() {
    const [ready, setready] = useState(false);
    const [newtopic, setnewtopic] = useState(false);
    const [msg, setmsg] = useState("");

    useEffect(() => {
        axios.get(baseUrl+'/posts')
            .then( res => {
                // console.log(res);
                topics =  res.data;
                // console.log(topics)
                setready(true);
            } )
            .catch( e=>{
                console.log(e);
            })
    }, []);


    const addTopic = (e) => {setnewtopic(true)};
    
    const postTopic = (e) => {
        if(sub=="") alert("Empty topic not allowed");
        else if(status.getUser()===""){
            setmsg("you cannot add a topic unless u r signed-in!!");
        }
        else {
            var date = new Date(); var tstamp = date.getTime();
            axios.post(baseUrl+'/add-post', {"topic_id":status.getUser()+tstamp, "writer" : status.getUser(), "topic" :  sub })
                .then( res => {
                    setmsg(res.data);
                })
                .catch( e =>{
                    console.log(e)
                    setmsg("error occured");
                })
        }
    };

    return (
        <div>
            {
                !ready && <Load />
            }
            {
                ready && (
            <div>
                <div className="head">Discuss Forum</div>
                <div>
                    {
                        topics.map( ele => {
                            return( <Topic id={ele.topic_id} topic={ele.topic} replies={ele.replies}  />
                            )
                        })
                        
                    }
                </div>

                <div className="btn-sec">
                    <Button onClick={addTopic} color="primary" variant="contained" >add a topic</Button>
                </div>
                { newtopic && (
                <div id="add-topic">
                    <input id="new-topic" type="text" className="new-topic-field"  onChange={ (e => {
                        sub = e.target.value
                    })}  />
                    <button onClick={postTopic} >post topic</button>
                </div>
                )}

                { msg!=="" && ( <i>{msg}</i>) }
            
            </div> 
            )}
        </div>
    )
}

export default Discuss
