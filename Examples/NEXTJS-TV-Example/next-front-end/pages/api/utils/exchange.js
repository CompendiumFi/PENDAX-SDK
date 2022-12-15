import { createExchange } from "@compendiumfi/pendax/exchanges/exchange.js";

const exchange = createExchange({
  exchange: "okx",
  authenticate: false,
  label: "okx",
  marginType: process.env.MARGIN_TYPE,
});

export default exchange;
