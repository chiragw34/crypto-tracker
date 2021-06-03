import React, { Component } from "react";
import { getData, main_data } from "./utils/SheetsData";

import Paper from "@material-ui/core/Paper";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
  PieSeries,
} from "@devexpress/dx-react-chart-material-ui";

export class Charts extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    getData().then(() => this.setState({ data: main_data }));
  }

  componentDidUpdate() {
    setTimeout(() => {
      getData().then(() => this.setState({ data: main_data }));
    }, 10000);
  }
  render() {
    const { data } = this.state;
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
}

export default Charts;
