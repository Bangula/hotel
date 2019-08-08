import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

function RoomList({ data, handleGetDetails }) {
  return (
    <>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="cell-sm">Room Number</TableCell>
              <TableCell className="cell-xs">Room Type</TableCell>
              <TableCell className="cell-xs" align="left">
                Beds
              </TableCell>
              <TableCell className="cell-xs" align="left">
                Price
              </TableCell>
              <TableCell className="cell-sm" align="right">
                More details
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .filter(item => item.usable > 0)
              .map(room => (
                <TableRow key={room.id}>
                  <TableCell className="cell-sm" component="th" scope="row">
                    {room.room_number}
                  </TableCell>
                  <TableCell className="cell-xs" align="left">
                    -
                  </TableCell>
                  <TableCell className="cell-xs" align="left">
                    -
                  </TableCell>
                  <TableCell className="cell-xs" align="left">
                    -
                  </TableCell>
                  <TableCell align="right" className="cell-xs">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleGetDetails(room.id)}
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

export default RoomList;
