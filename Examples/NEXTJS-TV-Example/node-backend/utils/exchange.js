import { createExchange } from "@compendiumfi/pendax/exchanges/exchange.js";

const exchange = createExchange({
  exchange: "okx",
  authenticate: false,
  key: "",
  secret: "",
  passphrase: "",
  label: "okx",
  marginType: "USDT",
});

export default exchange;
