import {React, useEffect, useState } from 'react'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Load from '../common/loading';
import Navb from '../common/navbar';
import Avatar from './avatar';
import {baseUrl} from '../../conf';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop : '2%',
        marginRight : '10%',
        marginLeft : '10%',
      backgroundColor : '#E8D54B',
      },
      head :{
        position: "relative",
        display: 'flex',
        flexDirection: 'row',
      },
      head_text : {
        position: 'relative',
        marginTop: '0.7%',
        marginBottom: '0.5%',
        paddingLeft : '1%',
        alignItems: 'center',
        fontWeight: 'bolder',
        fontSize: '1.5rem',
        verticalAlign: 'center',
      },
      fields :{
        textAlign: "left",
        position: "relative",
        marginLeft: "5%",
        paddingTop: "2px",
        paddingBottom: "2px",
      },
  }));
const data = { "email" : "devi_D@gmail.com", "Name" : "Devidutta Nayak"};
var prof = {};
var init = "";
var users = []

function Profile() {
    const classes = useStyles();
    const [err, seterr] = useState(false);
    const [ready, setready] = useState(false);

    useEffect(() => {
        axios.get(baseUrl+'/profile')
            .then( res=>{
                prof = Object.assign({}, res.data);
                init = res.data.username.toUpperCase()[0]; 
                axios.get(baseUrl+'/all-users')
                    .then( res2 => {
                        // console.log(res2);
                        res2.data.forEach(u => {
                            users.push(" "+ u.username +", ");
                        });
                        setready(true);
                    })
            })
            .catch( e =>{
                console.log(e);
                seterr(true);
            })
    }, [])


    return (
        <div>
            { !ready && (<Load />)}
            { err && (<div><h3>error occured</h3>probably your are not authorized/network-failure/some-bug<br />
            Try to refresh the pag or Login again  </div>)}
            { ready && ( <div>
            <Navb />
            <div className={classes.root}>
                <div className={classes.head} >
                    <Avatar initial={init} />
                    <div className={classes.head_text}> 
                        {prof.username}
                    </div>
                </div>
                {
                    Object.entries(prof).map( ele=> { 
                        return (<div className={classes.fields}>
                            {ele[0]} :<b> {ele[1]} </b>
                        </div>)
                    })
                }
            </div> 
            <div>
                <h3>chat-app details</h3>
                <li>both the friends must be connect to server at the same time</li>
                <li>when your status is 'connected' your message will reach to server</li>
                <li>if status is 'not connected' try refresh/go back and then got o chat</li>
                <b>users list:</b>
                <i>
                    {users}
                </i><br />
                <Link to='/chat'>start conversation</Link>
            </div> 
            </div>
            )}
        </div>
    )
}

export default Profile
