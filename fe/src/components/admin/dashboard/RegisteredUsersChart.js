import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

import {
  Card,
  Divider,
  CardContent,
  Button,
  Typography
} from "@material-ui/core";

const data = [
  {
    name: "Jan",
    "Last Year": 4000,
    "This Year": 2400,
    amt: 2400
  },
  {
    name: "feb",
    "Last Year": 3000,
    "This Year": 1398,
    amt: 2210
  },
  {
    name: "Mar",
    "Last Year": 2000,
    "This Year": 9800,
    amt: 2290
  },
  {
    name: "Apr",
    "Last Year": 2780,
    "This Year": 3908,
    amt: 2000
  },
  {
    name: "May",
    "Last Year": 1890,
    "This Year": 4800,
    amt: 2181
  },
  {
    name: "Jun",
    "Last Year": 2390,
    "This Year": 3800,
    amt: 2500
  },
  {
    name: "Jul",
    "Last Year": 3490,
    "This Year": 4300,
    amt: 2100
  }
];

export default class Example extends PureComponent {
  render() {
    return (
      <>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Stats for new users compared with last years results
          </Typography>
          {/* <Divider /> */}
        </CardContent>
        <BarChart
          className=" mx-auto w-full shadow-md"
          width={450}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="2 " />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Last Year" fill="#8884d8" />
          <Bar dataKey="This Year" fill="#82ca9d" />
        </BarChart>
      </>
    );
  }
}
