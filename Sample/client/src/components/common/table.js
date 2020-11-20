import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  paper :{
    backgroundColor: 'rgba(93, 103, 81, 0.7)',
  },
  lb : {
    color: "white",
  },
});

export default function BasicTable(props) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><b>{props.col.a}</b></TableCell>
            <TableCell align="center"><b>{props.col.b}</b></TableCell>
            <TableCell align="center"><b>{props.col.c}</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => (
            <TableRow key={row.username}>
              <TableCell component="th" scope="row" className={classes.lb}>
                {row.username}
              </TableCell>
              <TableCell align="center" className={classes.lb}>{row.score}</TableCell>
              <TableCell align="center" className={classes.lb} >{row.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
