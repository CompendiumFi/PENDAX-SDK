import exchange from "../../../utils/exchange";

export default async function handler(req, res) {
  if (req.method == "GET") {
    let markets = await exchange.getMarkets();

    //console.log("markets", markets);
    res.json({
      markets,
    });
  }
}
