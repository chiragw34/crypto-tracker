import axios from "axios";
import data from "./data.json";

export var total_invested = 0;
export var total_current = 0;
export var total_status = "";
export var total_percentage = 0;
export var total_amount = 0;
export var main_data = []

export const getData = async () => {
  console.log("fetching...");
  total_invested = 0;
  total_current = 0;
  total_status = "";
  total_percentage = 0;
  main_data = []


  return await axios.get("/v2/tickers").then((res) => {
    // console.log(res.data);
    var real = [];
    // eslint-disable-next-line array-callback-return
    data.Coins.map((c) => {
      var temp = res.data[c.Coin.toLowerCase() + "inr"];

      temp.amount = c.Amount;

      temp.invested = c.Invested;

      temp.current = (c.Amount * temp.last).toPrecision(8);

      temp.status = temp.current - temp.invested > 0 ? "Profit" : "Loss";

      temp.percentage = parseFloat(
        (((temp.current - temp.invested) / temp.invested) * 100).toPrecision(4)
      );

      total_invested = (
        parseFloat(total_invested) + parseFloat(temp.invested)
      ).toPrecision(8);

      total_current = (
        parseFloat(total_current) + parseFloat(temp.current)
      ).toPrecision(8);

      total_status = total_current - total_invested > 0 ? "Profit" : "Loss";

      total_percentage =
        total_status === "Profit"
          ? (
              ((total_current - total_invested) / total_invested) *
              100
            ).toPrecision(4)
          : (
              ((total_invested - total_current) / total_invested) *
              100
            ).toPrecision(4);

      total_amount =
        total_status === "Profit"
          ? `+ Rs. ${(total_current - total_invested).toPrecision(8)}`
          : `- Rs. ${(total_invested - total_current).toPrecision(8)}`;

      real.push(temp);
    });

    let sorted = real.sort((a, b) => {
      if (a.status === b.status) {
        return parseFloat(a.percentage) < parseFloat(b.percentage) ? 1 : -1;
        // if (a.status === "Profit") {
        //   return parseFloat(a.percentage) < parseFloat(b.percentage) ? 1 : -1;
        // } else {
        //   return parseFloat(a.percentage) < parseFloat(b.percentage) ? -1 : 1;
        // }
      } else {
        return a.status < b.status ? 1 : -1;
      }
    });

    main_data =  sorted;
  });
};

export const refresh = () => {
  return main_data
}