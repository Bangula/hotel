import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },

  table: {
    minWidth: 650
  }
}));

export default function SimpleTable({ data, handleGetDetails }) {
  const classes = useStyles();

  return (
    <>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Room Number</TableCell>
              <TableCell>Room Type</TableCell>
              <TableCell align="left">Beds</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="right">More details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(room => (
              <TableRow key={room.id}>
                <TableCell component="th" scope="row">
                  {room.room_number}
                </TableCell>
                <TableCell align="left">3</TableCell>
                <TableCell align="left">3</TableCell>
                <TableCell align="left">50$/Night</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={e => handleGetDetails(room.id)}
                  >
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}
