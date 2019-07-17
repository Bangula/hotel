import React, { PureComponent } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
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
    subject: "Mon",
    A: 120,
    B: 110,
    fullMark: 150
  },
  {
    subject: "Tue",
    A: 98,
    B: 130,
    fullMark: 150
  },
  {
    subject: "Wed",
    A: 86,
    B: 130,
    fullMark: 150
  },
  {
    subject: "Thu",
    A: 99,
    B: 100,
    fullMark: 150
  },
  {
    subject: "Fri",
    A: 85,
    B: 90,
    fullMark: 150
  },
  {
    subject: "Sat",
    A: 65,
    B: 85,
    fullMark: 150
  },
  {
    subject: "Sun",
    A: 65,
    B: 85,
    fullMark: 150
  }
];

export default class DashboardNewsletter extends PureComponent {
  render() {
    return (
      <Card className="md:w-2/6 w-full">
        <CardContent>
          {/* <Typography gutterBottom variant="h5" component="h2">
            New Users
        </Typography> */}
          <Typography variant="body2" color="textSecondary" component="p">
            Stats for new users compared with last years results
          </Typography>
          {/* <Divider /> */}
        </CardContent>
        <RadarChart cx="50%" cy="50%" width={500} height={300} data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis />
          <Radar
            name="Mike"
            dataKey="A"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
        </RadarChart>
      </Card>
    );
  }
}
