import React, { useContext } from "react";
import { DataContext } from "./contexts/DataContext";
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
  PieSeries,
} from "@devexpress/dx-react-chart-material-ui";

export default function Charts() {
  const { data } = useContext(DataContext);
  return (
    <>
      <Paper>
        <Chart data={data}>
          <ArgumentAxis />
          <ValueAxis max={7} />

          <BarSeries valueField="percentage" argumentField="base_unit" />
          <Title text="Percentage Increase/Decrease" />
        </Chart>
      </Paper>
      <Paper>
        <Chart data={data}>
          <PieSeries valueField="invested" argumentField="base_unit" />
          <Title text="Diversified" />
        </Chart>
      </Paper>
    </>
  );
}
