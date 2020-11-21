import React, {useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import './style.css' ;
import { baseUrl } from '../../conf';
import Load from '../common/loading';

var response = {};
var quests = [];

function Test_page() {

    const [err, seterr] = useState(false);
    const [isReady, setisReady] = useState(false);
    const [submitted, setsubmitted] = useState(false);
    const [msg, setmsg] = useState("")

    var c = 1;

    useEffect(() => {
        init();
        // return () => {
        //     cleanup
        // }
    }, []);

    const init =() => {
        axios.get(baseUrl+'/zapps/quize/t1')
        .then( res => {
            // console.log(res);
            quests = res.data;
            // console.log(quests);
            setisReady(true);
        })
        .catch(err => {
            // console.log(err);
            seterr(true);
        })
    }


    const send_res =(e) => {
        // console.log("submit");
        var res2 = [];
        
        for( var key in response ){
            var temp = { "qid" : key, "ans" : response[key] }
            res2.push(temp)
        }

        axios.post(baseUrl+'/zapps/submit-answers', res2)
            .then( res =>{
                // console.log(res);
                setmsg(res.data);
                setsubmitted(true);
            })
            .catch( err => {
                console.log(err);
            })

        // console.log(res2);
        e.preventDefault();
    }

    return (
        <div>
            <h2>Test</h2>
            {
                !isReady && (<Load />)
            }
            { err && (<div><h3>error occured</h3>probably your are not authorized/network-failure/some-bug<br />
            Try to refresh the pag or Login again  </div>)}
            {
                isReady && (
                    <div>
                    {
                        quests.map( ele => (
                            <Quest n={c} q={ele} > 
                                {c += 1 }
                            </Quest>
                        ))
                    }
                    <Button onClick={send_res} color="primary" variant="contained" >
                        Submit
                    </Button>
                    </div>
                )
            }
            {submitted? <h3>{msg}</h3> : "" }

        </div>
    )
}

const Quest = ( props ) =>{

    return (
        <div className="question">
            
            <div className="q">
                <div className="qn">
                    {props.n}
                </div>
                <div className="qbody">
                    {props.q.question}
                </div>
            </div>
            <div className="qopt-body">
                {console.log("hi")}
                {(props.q.options).map( element => (
                    <Opt op={element} id={props.q.qid} /> 
                )) }
            </div>
        </div>
    )
}

const Opt =(props) =>{
    return (
        <div className='qopt'>
            <input type="radio" id="male" name={props.id} value="male" onChange={ e => {
                response[props.id] = props.op;
            }} />
            <label for="male">{props.op}</label> <br />
        </div>
        
    )
};

export default Test_page
