import {React, useState, useEffect} from 'react';
import {HashRouter, Switch, Route } from 'react-router-dom';
import usr from '../status';
import Home from '../components/common/home';
import Login from '../components/auth/login';
import Register from '../components/auth/register';
import Notfound from '../components/common/notfound';
import Quize from '../components/contests/quize';
import Profile from '../components/user/profile'; 
import Discuss from '../components/discuss/discuss';
import Chat from '../components/user/chat';
import Load from '../components/common/loading';

function Routes() { 
    const [uname, setuname] = useState("devi");
    const [ready, setready] = useState(false)

    useEffect(() => {
        usr.init( ()=>{
            setready(true);
        })
    }, [])

    return (
        <div>
            <HashRouter>
                    { !ready && (<Load />)}
                    { ready && 
                    ( <Switch>
                        <Route exact path='/' component={()=> <Home username={uname} />} />
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/register' component={Register} /> 
                        <Route exact path='/profile' component={Profile} />
                        <Route exact path='/zapps/quize' component={Quize} />
                        <Route exact path='/discuss' component={Discuss} />
                        <Route exact path='/chat' component={Chat} />
                        <Route component={Notfound} />
                    </Switch> 
                    )}
            </HashRouter>
        </div>
    )
}

export default Routes
