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
  });
  
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData(1,'Frozen yoghurt', 159, 'Jack', '22nd Jan, 2021', 4.0),
    createData(2,'Ice cream sandwich', 237,  'Jack','24th Jan, 2021', 4.3),
    createData(3,'Eclair', 262, 'Jack', '24th Jan, 2021', 6.0),
    createData(4,'Cupcake', 305, 'Jack', '25th Jan, 2021', 4.3),
    createData(5,'Gingerbread', 356, 'Jack', '27th Jan, 2021', 3.9),
  ];


const TopDocumentsTable = () => {
    
    const classes = useStyles();

    return (
     
<TableContainer component={Paper}>
<Table className={classes.table} aria-label="simple table">
  <TableHead style={{ background: '#f5f5f5'}}>
    <TableRow>
    <TableCell >No.</TableCell>
      <TableCell >Title</TableCell>
      <TableCell align="right">Visits</TableCell>
      <TableCell align="right">User</TableCell>
      <TableCell align="right">Date&nbsp;Uploaded</TableCell>
      
    </TableRow>
  </TableHead>
  <TableBody>
    {rows.map((row) => (
      <TableRow key={row.name}>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell >{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
</TableContainer>
    
    );
}

export default TopDocumentsTable;