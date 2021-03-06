import {React, useState, useEffect } from 'react';
import axios from 'axios';
import Load from '../common/loading';
import Navbar from '../common/navbar';
import Card2 from './cards/card2';
import Card1 from './cards/card1';
import './style.css';
import Table from './table';
import conf, { baseUrl } from '../../conf';
import status from '../../status';
import {MobileView} from 'react-device-detect';
import {Link, useHistory} from 'react-router-dom';

const col = {'a':"username", 'b':'score', 'c': "time taken" };
const rows = [ { 'name':'devi_D', 'score': "88", "time": '10 min'  } ,
{ 'name':'raju', 'score': "98", "time": '11 min'  } 
]
var table_cols = {'a': "", 'b' : "",  'c' : ""};
var dummy = { };
var table_rows = [];

function Home(props) {
    const [ready, setready] = useState(false);
    const [err, seterr] = useState(false);
    const [user, setuser] = useState(props.username);
    
    useEffect(() => {
        axios.get(baseUrl+'/lb/t1')
            .then( res =>{
                // console.log(res);
                table_rows = res.data;                
                setready(true);
            })
            .catch( e => {
                console.log("error");
                seterr(true);
            })
    }, [])

    return (
        <div>
            { !ready && (<Load />) }
            { err && (<div><h3>error occured</h3>probably your are not authorized/network-failure/some-bug<br />
            Try to refresh the pag or Login again  </div>)}
            { ready && (
                <div className="bg-home">
                    <Navbar username={user} />
                    <i >for mobile users: <Link className="link" to='/login'>click to login</Link> if u r not </i> 
                    <div className="home">
                        <div className="row">
                            <div className="item-home col-6">
                            <Card1 title={"Quizz"}  hashtag={["cs", "coding"]} btnTxt="Give Test"  />
                            </div>
                            <div className="item-home col-6">
                            <Card2 title={"Who's the real 🐍"}  hashtag={["club", "webD"]} btnTxt="Discuss"  />
                            </div>
                        </div>
                    </div>

                    <div className="lb">
                        <div className="lb-title">
                            <h3 >Leader board</h3> 
                        </div>
                        <Table col={col} rows={table_rows} />
                    </div>
                    
                </div>
            )}
        </div>
    )
}

export default Home
