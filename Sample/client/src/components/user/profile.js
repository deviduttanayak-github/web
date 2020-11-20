import {React, useEffect, useState } from 'react'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Load from '../common/loading';
import Navb from '../common/navbar';
import Avatar from './avatar';
import {baseUrl} from '../../conf';

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

function Profile() {
    const classes = useStyles();
    // const [usr, setusr] = useState(null);
    const [ready, setready] = useState(false);

    useEffect(() => {
        axios.get(baseUrl+'/profile')
            .then( res=>{
                prof = Object.assign({}, res.data);
                init = res.data.username.toUpperCase()[0]; 
                setready(true);
            })
            .catch( e =>{
                console.log(e);
            })
    }, [])


    return (
        <div>
            { !ready && (<Load />)}
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
            </div>
            )}
        </div>
    )
}

export default Profile
