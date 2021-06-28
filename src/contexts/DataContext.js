import React, { Component, createContext } from "react";
import {
  getData,
  getDecision,
  main_data,
  total_invested,
  total_current,
  total_percentage,
  total_status,
  total_amount,
  sentiment,
} from "../utils/SheetsData";

export const DataContext = createContext();

class DataContextProvider extends Component {
  state = {
    data: [],
    total_invested: 0,
    total_current: 0,
    total_percentage: 0,
    total_status: "",
    total_amount: 0,
    sentiment:''
  };

  componentDidMount() {
    getData().then(() =>
      this.setState({
        data: main_data,
        total_invested,
        total_current,
        total_percentage,
        total_status,
        total_amount,
        sentiment,
      })
    );
  }

  componentDidUpdate() {
    setTimeout(() => {
      getData().then(() =>
        this.setState({
          data: main_data,
          total_invested,
          total_current,
          total_percentage,
          total_status,
          total_amount,
          sentiment,
        })
      );
    }, 1000);
  }

  decide = (coin) => {
    getDecision(coin)
  };

  render() {
    return (
      <DataContext.Provider value={{ ...this.state, decide: this.decide }}>
        {this.props.children}
      </DataContext.Provider>
    );
  }
}

export default DataContextProvider;
