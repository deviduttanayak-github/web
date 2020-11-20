import React, {useReducer, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import conf from '../../conf';
import status from '../../status';

const baseurl = conf.baseUrl;

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Team X
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  err : {
    backgroundColor: '#EE7B5B',
  }
}));

// -------------------------- start ------------------------

const user_ = {
  'email' : "", 'password' : "" 
}

const setUser = (state, action) => {
  switch (action.field) {
    case 'email': return { 'email': action.payload , 'password' : state.password };
    case 'password' : return { 'email': state.email , 'password' : action.payload };
    default:
      throw new Error('No such field');
  }
}


export default function SignInSide() {
  const classes = useStyles();

  const [sucess, setsucess] = useState(false);
  const [failed, setfailed] = useState(false);
  const [user, dispatch] = useReducer(setUser, user_);
  const broserpath = useHistory();

  const verify = (e) => {
    console.log(user);
    if(user.email!=="" && user.password!=="")
    axios.post(baseurl+'/auth/login', user, { mode : 'no-cors' })
        .then(res => {
          console.log(res);
          if(res.status===200){
            console.log('sucess');
            status.logout();
            status.init( () => {
              setsucess(true);
              broserpath.push('/');
            });
          }
          else{
            setfailed(true);
          }
        })
        .catch( err => {
          alert(err);
        })
    else {
      alert("Empty fields");
    }
    e.preventDefault();
  }


  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value = {user.email}
              onChange = { e => {
                dispatch({ 'field' : 'email', 'payload' : e.target.value })
              } }
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange = { e => {
                dispatch({ 'field' : 'password', 'payload' : e.target.value })
              } }
            />
            {
              failed && (
                <div className= {classes.err}>
                  <b>Login Failed!!</b> check email and password 
                </div>
              )
            }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick = {verify}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}