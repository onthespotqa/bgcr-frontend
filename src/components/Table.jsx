// import React, { Component } from 'react'
// import {Link} from "react-router-dom";
// import {linkTo} from "../../utils/resource";
// import { withStyles, makeStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
//
//
// const DataTable  = props => {
//     const classes = props.classes;
//     const headers = props.headers;
//     const data = props.data;
//     <Paper className={classes.root}>
//         <Table className={classes.table}>
//             <TableHead>
//                 <TableRow>
//                 </TableRow>
//                 {headers.map(row => {
//                     <TableCell>{row}</TableCell>
//                 }}
//
//             </TableHead>
//             <TableBody>
//                 {data.map(row => (
//                     <TableRow key={row.id}>
//                         <TableCell component="th" scope="row">
//                             <Link to={linkTo(row)}>{row.blog}</Link>
//                         </TableCell>
//                         <TableCell>{row.skin}</TableCell>
//                         <TableCell>{row.undertone.join(', ')}</TableCell>
//                     </TableRow>
//                 ))}
//             </TableBody>
//         </Table>
//     </Paper>
// }
//
// export default DataTable