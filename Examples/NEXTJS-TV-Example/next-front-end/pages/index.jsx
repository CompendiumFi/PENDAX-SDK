import { Card, Col, Container, Grid, Row, Text } from "@nextui-org/react";
import dynamic from "next/dynamic";
import ActiveMarkets from "../components/ActiveMarkets";
import Header from "../components/Header";
import RecentTradesTable from "../components/RecentTradesTable";
const TVChartContainer = dynamic(
  () => import("../components/TVChartContainer"),
  {
    ssr: false,
  }
);
export default function Home() {
  return (
    <Container>
      <Header />

      <Row>
        <Col>
          <Card>
            <TVChartContainer />
          </Card>
        </Col>
        <Col>
          <Row gap={1} css={{ flexDirection: "column" }}>
            <Col>
              <ActiveMarkets />
            </Col>
            <Col>
              <RecentTradesTable />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
