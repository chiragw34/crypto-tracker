/* eslint-disable array-callback-return */
import axios from "axios";
import data from "./data.json";

export var total_invested = 0;
export var total_current = 0;
export var total_status = "";
export var total_percentage = 0;
export var total_amount = 0;
export var main_data = [];
export var sentiment = ''

export const getDecision = async (coin) => {
  var 
    buyVolume = 0,
  
    sellVolume = 0,
    msg = "",
    percent = 0;

  await axios.get(`/v2/depth?market=${coin}`).then((res) => {
    const { asks, bids } = res.data;
    console.log(asks, bids);

    // buy
    bids.map((entry) => {
      buyVolume = buyVolume + parseFloat(entry[1]);
    });
    console.log(buyVolume);

    // sell
    asks.map((entry) => {
      sellVolume = sellVolume + parseFloat(entry[1]);
    });
    console.log(sellVolume);

    var totalVolume = buyVolume + sellVolume

    if (buyVolume > sellVolume) {
      msg = "buy";
      percent = (buyVolume/totalVolume)*100
    } else {
      msg = "sell";
      percent = (sellVolume/totalVolume)*100
    }
  });
  sentiment = `${percent.toFixed(2)}% ${msg} ${coin.slice(0, -3).toUpperCase()}`;

  return `${percent}% ${msg} ${coin.slice(0,-3).toUpperCase()}`;
};

export const getData = async () => {
  console.log("fetching...");
  total_invested = 0;
  total_current = 0;
  total_status = "";
  total_percentage = 0;
  main_data = [];

  return await axios.get("/v2/tickers").then((res) => {
    // console.log(res.data);
    var real = [];
    // eslint-disable-next-line array-callback-return
    data.Coins.map((c) => {
      var temp = res.data[c.Coin.toLowerCase() + "inr"];

      temp.amount = c.Amount;

      temp.invested = c.Invested;

      temp.current = (c.Amount * temp.last).toFixed(4);

      temp.status = temp.current - temp.invested > 0 ? "Profit" : "Loss";

      temp.percentage = parseFloat(
        (((temp.current - temp.invested) / temp.invested) * 100).toFixed(2)
      );

      temp.average = (temp.invested / temp.amount).toFixed(6);

      total_invested = (
        parseFloat(total_invested) + parseFloat(temp.invested)
      ).toFixed(6);

      total_current = (
        parseFloat(total_current) + parseFloat(temp.current)
      ).toFixed(6);

      total_status = total_current - total_invested > 0 ? "Profit" : "Loss";

      total_percentage =
        total_status === "Profit"
          ? (((total_current - total_invested) / total_invested) * 100).toFixed(
              6
            )
          : (((total_invested - total_current) / total_invested) * 100).toFixed(
              6
            );

      total_amount =
        total_status === "Profit"
          ? `+ Rs. ${(total_current - total_invested).toFixed(6)}`
          : `- Rs. ${(total_invested - total_current).toFixed(6)}`;

      real.push(temp);
    });

    let sorted = real.sort((a, b) => {
      if (a.status === b.status) {
        return parseFloat(a.percentage) < parseFloat(b.percentage) ? 1 : -1;
      } else {
        return a.status < b.status ? 1 : -1;
      }
    });

    main_data = sorted;
  });
};
