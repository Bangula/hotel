import React, { PureComponent } from "react";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
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
    name: "Monday",
    uv: 590,
    pv: 800,
    amt: 1400
  },
  {
    name: "Page B",
    uv: 868,
    pv: 967,
    amt: 1506
  },
  {
    name: "Page C",
    uv: 1397,
    pv: 1098,
    amt: 989
  },
  {
    name: "Page D",
    uv: 1480,
    pv: 1200,
    amt: 1228
  },
  {
    name: "Page E",
    uv: 1520,
    pv: 1108,
    amt: 1100
  },
  {
    name: "Page F",
    uv: 1400,
    pv: 680,
    amt: 1700
  }
];

export default class Example extends PureComponent {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/94sebfL8/";

  render() {
    return (
      <Card className="w-2/6 ">
        <CardContent>
          {/* <Typography gutterBottom variant="h5" component="h2">
          New Users
      </Typography> */}
          <Typography variant="body2" color="textSecondary" component="p">
            Stats for new daily registered users
          </Typography>
          {/* <Divider /> */}
        </CardContent>
        <ComposedChart
          className="mx-auto shadow-md"
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* <Bar dataKey="uv" barSize={20} fill="#413ea0" /> */}
          <Line type="monotone" dataKey="uv" stroke="#ff7300" />
        </ComposedChart>
      </Card>
    );
  }
}
