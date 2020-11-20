import {React, useState, useEffect } from 'react';
import axios from 'axios';
import Load from '../common/loading';
import Navbar from '../common/navbar';
import Card2 from './cards/card2';
import Card1 from './cards/card1';
import './style.css';
import Table from './table';
import conf, { baseUrl } from '../../conf';

const col = {'a':"username", 'b':'score', 'c': "time taken" };
const rows = [ { 'name':'devi_D', 'score': "88", "time": '10 min'  } ,
{ 'name':'raju', 'score': "98", "time": '11 min'  } 
]
var table_cols = {'a': "", 'b' : "",  'c' : ""};
var dummy = { };
var table_rows = [];

function Home(props) {
    const [ready, setready] = useState(false);
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
            })
    }, [])

    return (
        <div>
            { !ready && (<Load />) }
            { ready && (
                <div className="bg-home">
                    <Navbar username={user} />
                    <div className="home">
                        <div className="row">
                            <div className="item-home col-6">
                            <Card1 title={"Quize"}  hashtag={["cs", "coding"]} btnTxt="Give Test"  />
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
