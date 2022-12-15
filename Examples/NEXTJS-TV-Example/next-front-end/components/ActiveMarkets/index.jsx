import React from "react";
import { Button, Card, Table, StyledTableRow } from "@nextui-org/react";
import { useMarket } from "../../providers/market";
import { useEffect } from "react";
const ActiveMarkets = () => {
  const { selectedMarket, marketList, setSelectedMarket } = useMarket();
  const handleMarketChange = (marketId) => {
    setSelectedMarket(marketId);
  };
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
          <Table.Column>TYPE</Table.Column>
          <Table.Column>NAME</Table.Column>
          <Table.Column>LAST SIZE</Table.Column>
          <Table.Column>ACTION</Table.Column>
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
          {marketList.map((elm) => (
            <Table.Row key={elm.instId}>
              <Table.Cell>{elm.instType}</Table.Cell>
              <Table.Cell>{elm.instId}</Table.Cell>
              <Table.Cell>{elm.lastSz}</Table.Cell>
              <Table.Cell>
                {selectedMarket !== elm.instId ? (
                  <Button onClick={(e) => handleMarketChange(elm.instId)}>
                    Select
                  </Button>
                ) : (
                  <Button isDisabled color={"error"}>
                    Selected
                  </Button>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Card>
  );
};

export default ActiveMarkets;
