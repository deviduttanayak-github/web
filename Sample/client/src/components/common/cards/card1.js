import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { borders } from '@material-ui/system';
import im from '../../../images/demo3.jpg';
import axios from 'axios';
import { baseUrl } from '../../../conf';
import { Link, useHistory } from 'react-router-dom' 

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width : 300,
    },
    media: {
      marginBottom: '0px',
      paddingTop: '56.25%', // 16:9
      // borderBlockColor: 'rgb(220,220,220)',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    btn : {
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    head: {
      paddingTop: "2px",
      paddingBottom: "4px",
      justifyContent: 'center',
      textAlign: 'center',
    },
    content: {
      paddingTop: '0px',
      paddingBottom: '0px',
    },
    foot: {
      justifyContent: 'center',
      textAlign: 'center',
      fontSize: '1rem',
      flexDirection: 'left'
    },
    time :{
      float: 'left',
      textAlign: 'center',
      alignSelf: 'center',
      width: '43%',
      paddingLeft: '10px',
      paddingRight: '10px',
      backgroundColor: '#F69073',
    },
    studs:{
      float: 'right',
      width: '43%',
      paddingLeft: '10px',
      paddingRight: '10px',
      backgroundColor: '#73F68B',
    },
  }),
);

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const history = useHistory();
  // props { id, image-id, title, closetime, hashtags, brief-description, n-paritcipants }

  const register = (e) => {
    history.push('/zapps/quize');
  };

  return (
    <Card className={classes.root} >
      <CardMedia 
        className={classes.media}
        image={im}
        title={props.title}
      />
      <CardContent className={classes.content}> 
      <CardHeader className={classes.head}
        title={props.title}
        // subheader="September 14, 2016" // will convert from timestamp to date format 
      />
        <Typography variant="body1" color="primary" >
          <Hash hash_arr={props.hashtag} />
        </Typography>
  
      </CardContent>
      <CardActions className={classes.btn} disableSpacing>
        
        <Button color="primary" variant="contained" onClick={register} >
          {props.btnTxt}
        </Button>
      </CardActions>

        
      
    </Card>
  );
}

function Hash(props){
  var hashs = ""
  props.hash_arr.forEach(element => {
    hashs += ("#" + element + " ")
  });
  return (
    <div>
      {hashs}
    </div>
  )
}
