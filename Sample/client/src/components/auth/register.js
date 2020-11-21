import React , {useReducer, useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import Load from '../common/loading';
import { baseUrl } from '../../conf';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '3%',
    backgroundColor: 'white',
    borderRadius: '10px'
  },
  paper: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    marginBottom : theme.spacing(4),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  sucess : {
    backgroundColor : '#56EE9A' ,
  }
}));

// ----------------------------------------------- start here ---------------------------------------------- //

const user_ = {
  'firstName' : "",
  'lastName' : "",
  'username' : "",
  'email' : "",
  'password' : "",
}

const setUser = (state, action) => {
  switch(action.field) {
    case 'firstName' : return {
      'firstName' : action.payload, 'lastName' : state.lastName , 'username' : state.username , 'email' : state.email , 'password' : state.password    
    }
    case 'lastName' : return {
      'firstName' : state.firstName, 'lastName' : action.payload , 'username' : state.username , 'email' : state.email , 'password' : state.password    
    }
    case 'username' : return {
      'firstName' : state.firstName, 'lastName' : state.lastName , 'username' : action.payload , 'email' : state.email , 'password' : state.password    
    }
    case 'email' : return {
      'firstName' : state.firstName, 'lastName' : state.lastName , 'username' : state.username , 'email' : action.payload , 'password' : state.password    
    }
    case 'password' : return {
      'firstName' : state.firstName, 'lastName' : state.lastName , 'username' : state.username , 'email' : state.email , 'password' : action.payload    
    }
    default : 
      throw new Error('No field matched')
  }
}

export default function SignUp() {
  const classes = useStyles();
  const [ready, setready] = useState(false);
  const [conf, setconf] = useState("");
  const [user, dispatch] = useReducer(setUser, user_);
  const [sucess, setsucess] = useState(false);
  const [redir, setredir] = useState(false);

  const check_fields = ( callback ) => {
    var match = conf === user.password;
    callback(match && conf!=="" && user.firstName!=="" && user.lastName!==""
      &&  user.email!=="" && user.username!=="" );
  }

  const register = (e) => {
    check_fields( isgood => {
      if(isgood){
        axios.post(baseUrl+'/auth/signup', user, { mode : 'no-cors' })
        .then(res => {
          console.log(res);
          if(res.status===200){
            console.log('success')
            setsucess(true);
            // setTimeout(() => {
            //   setredir(true);
            // }, 500);
          }
        })
        .catch( err => {
          alert("Something went Wrong!!\n" + err);
        })
      }
      else{
        alert("Invalid Input(s)");
      }
    })
    e.preventDefault();
  }

  useEffect(() => {
      setready(true);
      return () => {
        console.log("end");
    }
  }, [])

  return (
    <div>
        { ready===false && (<Load />)}
        { ready && (
    <Container component="main" maxWidth="xs" className={classes.root} >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={user.firstName}
                onChange={ e => {
                  dispatch( {'field' : 'firstName', 'payload' : e.target.value } )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={user.lastName}
                onChange={ e => {
                  dispatch( {'field' : 'lastName', 'payload' : e.target.value } )
                }}
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Give a cool username"
                name="username"
                autoComplete="uname"
                value={user.username}
                onChange={ e => {
                  dispatch( {'field' : 'username', 'payload' : e.target.value } )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={user.email}
                onChange={ e => {
                  dispatch( {'field' : 'email', 'payload' : e.target.value } )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={user.password}
                onChange={ e => {
                  dispatch( {'field' : 'password', 'payload' : e.target.value } )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="conf"
                label="Confirm Password"
                type="password"
                id="conf"
                autoComplete="conf-password"
                value={conf}
                onChange={ e => {
                  setconf(e.target.value)
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={register}
          >
            Sign Up
          </Button>
          <div className={classes.sucess}>
            {
              sucess? ( <div> <b>Sucessfully Registered!!</b>  </div>): null
            }
            {/* {
              redir? <Redir /> : null
            } */}
          </div>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#/login" variant="body2">
                Already have an account? Sign in
              </Link>
              <br />
              <i>NOTE: password is not encrypted, so kindly don't use your universal/other_account password</i>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        {/* <Copyright /> */}
      </Box>
    </Container>  )}
    </div>
  );
}
