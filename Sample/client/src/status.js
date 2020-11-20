import axios from 'axios';
import { baseUrl } from './conf';
// username is stored in local storage as 'username'

const init = async (next) =>{
    console.log("initializing", localStorage.getItem('username'));
    if(localStorage.getItem('username')==="" || localStorage.getItem('username')===null ){
        axios.get(baseUrl+"/auth/status")
            .then( res => {
                if(res.status===200) 
                localStorage.setItem('username', res.data);
                else localStorage.setItem('username', "");
                next();
            })
            .catch( err => {
                console.log('error');
                localStorage.setItem('username', "");
                next();
            })
    }
    next();
};

const getUser = () => {
    return localStorage.getItem('username');
};

const setLocal = (usr) => {
    localStorage.setItem('username', usr);
};

const logout = () => {
    localStorage.setItem('username', "");
}

export default  {init, getUser, setLocal, logout};