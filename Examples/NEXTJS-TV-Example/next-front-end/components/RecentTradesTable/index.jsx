import React, { useEffect, useState } from "react";
import { Card, Table, StyledTableRow } from "@nextui-org/react";
import { getApi, postApi } from "../../utils/apiHelpers";
import { useMarket } from "../../providers/market";
const RecentTradesTable = () => {
  const { selectedMarket } = useMarket();
  const [orderList, setOrderList] = useState([]);
  const getMarkets = async () => {
    try {
      let { data } = await getApi(
        `okx/orders?instId=${selectedMarket.replace("/", "-")}`
      );
      console.log("Result", data);
      if (data) {
        setOrderList(data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getMarkets();
  }, [selectedMarket]);
  return (
    <Card css={{ minWidth: "350px", mb: 10 }}>
      <Table
        shadow={false}
        css={{
          minWidth: "100%",
          height: "500px",
          thead: {
            display: "table",
            width: "100%",
            tableLayout: "fixed",
          },
        }}
      >
        <Table.Header>
          <Table.Column>TIME</Table.Column>
          <Table.Column>SIDE</Table.Column>
          <Table.Column>{`PRICE(${
            selectedMarket.replace("/", "-").split("-")[1]
          })`}</Table.Column>
          <Table.Column>
            {`AMOUNT(${selectedMarket.replace("/", "-").split("-")[0]})`}
          </Table.Column>
          <Table.Column>{`TOTAL(${
            selectedMarket.replace("/", "-").split("-")[1]
          })`}</Table.Column>
        </Table.Header>
        <Table.Body
          css={{
            height: "100%",
            display: "block",
            overflow: "auto",
            pb: "$14",
            [`& ${StyledTableRow}`]: {
              display: "table",
              width: "100%",
              tableLayout: "fixed",
            },
          }}
        >
          {orderList.map((elm) => (
            <Table.Row key={elm.ts}>
              <Table.Cell
                css={{ color: elm.side == "sell" ? "$error" : "$success" }}
              >
                {new Date(Number(elm.ts)).toDateString()}
              </Table.Cell>
              <Table.Cell
                css={{ color: elm.side == "sell" ? "$error" : "$success" }}
              >
                {elm.side}
              </Table.Cell>
              <Table.Cell
                css={{ color: elm.side == "sell" ? "$error" : "$success" }}
              >
                {elm.px}
              </Table.Cell>
              <Table.Cell
                css={{ color: elm.side == "sell" ? "$error" : "$success" }}
              >
                {elm.sz}
              </Table.Cell>
              <Table.Cell
                css={{ color: elm.side == "sell" ? "$error" : "$success" }}
              >
                {Number(elm.sz) * Number(elm.px)}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Card>
  );
};

export default RecentTradesTable;
