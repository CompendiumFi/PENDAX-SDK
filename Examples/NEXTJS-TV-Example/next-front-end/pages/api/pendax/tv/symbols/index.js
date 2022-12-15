
export default function handler(req, res) {
  if (req.method == "GET") {
    try {
      let { symbol } = req.query;
      res.json({
        name: symbol,
        ticker: symbol,
        description: symbol,
        type: "Spot",
        session: "24x7",
        exchange: "Pendax DEX",
        listed_exchange: "Pendax DEX",
        timezone: "Etc/UTC",
        has_intraday: true,
        supported_resolutions: [
          "1",
          "3",
          "5",
          "15",
          "30",
          "60",
          "120",
          "180",
          "240",
          "1D",
          "2D",
          "1M",
        ],
        minmov: 1,
        pricescale: 100000,
      });
    } catch (error) {}
  }
}
