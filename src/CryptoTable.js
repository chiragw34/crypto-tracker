import React, {useContext } from "react";
import { Loader, Table } from "semantic-ui-react";

import { DataContext } from "./contexts/DataContext";

export default function CryptoTable() {

  const {
    data,
    total_invested,
    total_current,
    total_percentage,
    total_status,
    total_amount,
    decide
  } = useContext(DataContext);

  return (
    <div className="table-div">
      <Table celled inverted textAlign="center">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>PORTFOLIO INVESTED</Table.HeaderCell>
            <Table.HeaderCell>PORTFOLIO CURRENT</Table.HeaderCell>
            <Table.HeaderCell>AMOUNT</Table.HeaderCell>
            <Table.HeaderCell>PORTFOLIO STATUS</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Rs. {total_invested}</Table.Cell>
            <Table.Cell>Rs. {total_current}</Table.Cell>
            <Table.Cell
              positive={total_status === "Profit"}
              negative={total_status === "Loss"}
            >
              {total_amount}
            </Table.Cell>
            <Table.Cell
              positive={total_status === "Profit"}
              negative={total_status === "Loss"}
            >
              {total_percentage}% {total_status}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Table celled inverted compact textAlign="center" selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>SR NO.</Table.HeaderCell>
            <Table.HeaderCell>COIN</Table.HeaderCell>
            <Table.HeaderCell>LOWEST TODAY</Table.HeaderCell>
            <Table.HeaderCell>HIGHEST TODAY</Table.HeaderCell>
            <Table.HeaderCell>COIN VALUE</Table.HeaderCell>
            <Table.HeaderCell>AVERAGE BUY PRICE</Table.HeaderCell>
            <Table.HeaderCell>AMOUNT</Table.HeaderCell>
            <Table.HeaderCell>INVESTED</Table.HeaderCell>
            <Table.HeaderCell>CURRENT VALUE</Table.HeaderCell>
            <Table.HeaderCell>PROFIT/LOSS</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        {data.length === 0 ? (
          <Table.Row>
            <Loader active />
          </Table.Row>
        ) : (
          <Table.Body>
            {data.map(
              (
                {
                  base_unit,
                  invested,
                  amount,
                  last,
                  current,
                  status,
                  percentage,
                  average,
                  low,
                  high,
                },
                i
              ) => (
                <Table.Row
                  key={i}
                  positive={status === "Profit"}
                  negative={status === "Loss"}
                  onClick={() => decide(base_unit + "inr")}
                >
                  <Table.Cell>{i + 1}</Table.Cell>
                  <Table.Cell>{base_unit.toUpperCase()}</Table.Cell>
                  <Table.Cell>Rs. {low}</Table.Cell>
                  <Table.Cell>Rs. {high}</Table.Cell>
                  <Table.Cell>Rs. {last}</Table.Cell>
                  <Table.Cell>Rs. {average}</Table.Cell>
                  <Table.Cell>{amount}</Table.Cell>
                  <Table.Cell>Rs. {invested}</Table.Cell>
                  <Table.Cell>Rs. {current}</Table.Cell>
                  <Table.Cell>
                    {percentage}% {status}
                  </Table.Cell>
                </Table.Row>
              )
            )}
          </Table.Body>
        )}
      </Table>
    </div>
  );
}
