import React from "react";
import ReactTable from "react-table";
import { Link } from "react-router-dom";

const RommList = ({ data }) => {
  const columns = [
    {
      Header: "Room number",
      accessor: "room_number" // String-based value accessors!
    },
    {
      Header: "Details",
      //   accessor: "age",
      Cell: props => (
        <Link to="/" className="number italic text-center text-blue-500">
          View details
        </Link>
      ) // Custom cell components!
    }
  ];

  return <ReactTable data={data} columns={columns} />;
};

export default RommList;
