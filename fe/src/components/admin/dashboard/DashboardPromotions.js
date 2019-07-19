import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { green } from "@material-ui/core/colors";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Card,
  Divider,
  CardContent,
  Badge,
  Typography
} from "@material-ui/core";
import { getPromotionsPerPage } from "@endpoints/promotions";
import "@zendeskgarden/react-pagination/dist/styles.css";
import { WidthContext } from "../../common/context/ContextProvider";

// PROMOTIONS PANEL
const DashboardPromotions = props => {
  const { windowWidth } = React.useContext(WidthContext);
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
          <Card className="md:w-11/12 w-full mx-auto">
            <Paper>
              <CardContent className="flex justify-end">
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  style={{ marginRight: "auto" }}
                >
                  latest registered users
                </Typography>
                <Link to="/admin/promotions">
                  <Button variant="contained">
                    Promotions
                    <i className="pl-4 text-lg far fa-arrow-alt-circle-right " />
                  </Button>
                </Link>
              </CardContent>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className="cell-md">Promotion Name</TableCell>

                    <TableCell className="cell-sm" align="left">
                      Starting At
                    </TableCell>
                    <TableCell className="cell-xs" align="left">
                      Ending At
                    </TableCell>
                    <TableCell className="cell-xs" align="left">
                      Active
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {promotions.map(promotion => (
                    <TableRow key={promotion.id}>
                      <TableCell align="left">{promotion.name}</TableCell>
                      <TableCell className="cell-sm">
                        {promotion.starting_at}
                      </TableCell>
                      <TableCell className="cell-sm">
                        {promotion.ending_at}
                      </TableCell>
                      <TableCell className="cell-xs">
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
