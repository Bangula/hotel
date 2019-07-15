import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { green } from "@material-ui/core/colors";
import {
  makeStyles,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Card,
  Divider,
  CardContent,
  Badge
} from "@material-ui/core";
import { getPromotionsPerPage } from "@endpoints/promotions";
import "@zendeskgarden/react-pagination/dist/styles.css";

// PROMOTIONS PANEL
const DashboardPromotions = props => {
  const [totalPages, setTotalPages] = useState(null);
  const [promotions, setPromotions] = useState([]);

  //per page
  const setPages = async page => {
    const { data, error } = await getPromotionsPerPage(page);
    if (data) {
      setTotalPages(data.data.meta.pagination.total_pages);
      console.log("Promotions  fetched", data.data);
    } else if (error) {
      console.log(error.response);
    }
  };
  const getAllPromotions = async page => {
    const { data, error } = await getPromotionsPerPage(page);
    if (data) {
      setPromotions(data.data.data);

      console.log("Promotions  fetched", data.data);
    } else if (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    setPages();
  }, []);

  useEffect(() => {
    if (totalPages) {
      getAllPromotions(totalPages);
    }
  }, [totalPages]);

  return (
    <div className="text-center w-full">
      <>
        <div className="from-top " />
        {promotions.length ? (
          <Card className="w-11/12 mx-auto">
            <Paper>
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  Latest Promotions
                </Typography>
                <Divider />
              </CardContent>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Promotion Name</TableCell>

                    <TableCell align="left">Starting At</TableCell>
                    <TableCell align="left">Ending At</TableCell>
                    <TableCell align="left">Active</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {promotions.map(promotion => (
                    <TableRow key={promotion.id}>
                      <TableCell align="left">{promotion.name}</TableCell>
                      <TableCell>{promotion.starting_at}</TableCell>
                      <TableCell>{promotion.ending_at}</TableCell>
                      <TableCell>
                        {promotion.active ? (
                          <Badge color="primary" variant="dot" />
                        ) : (
                          <Badge color="secondary" variant="dot" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Card>
        ) : (
          <CircularProgress />
        )}
      </>
    </div>
  );
};

//CREATE OR EDIT PROMOTION

export default DashboardPromotions;
