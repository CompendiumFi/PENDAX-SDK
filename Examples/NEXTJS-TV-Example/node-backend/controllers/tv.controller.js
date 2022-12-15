import exchange from "../utils/exchange.js";
export const convertResolutionToApi = (resolution) => {
  switch (resolution) {
    case "1":
      return "1m";
    case "3":
      return "3m";
    case "5":
      return "5m";
    case "15":
      return "15m";
    case "30":
      return "30m";
    case "45":
      return "45m";
    case "60":
      return "1H";
    case "120":
      return "2H";
    case "240":
      return "4H";
    case "720":
      return "12h";
    case "1D":
      return "1D";
    case "2D":
      return "2D";
    case "3D":
      return "3D";
    case "5D":
      return "5D";
    case "7D":
      return "7D";
    case "1M":
      return "1M";
    case "2M":
      return "2M";
    case "3M":
      return "3M";
    case "6M":
      return "6M";
    case "1Y":
      return "1Y";
    default:
      throw Error(`convertResolutionToApi resolution error: ${resolution}`);
  }
};

export const getSymbol = async (req, res) => {
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
      ],
      minmov: 1,
      pricescale: 100000,
    });
  } catch (error) {}
};
export const tvHistory = async (req, res) => {
  let { symbol, resolution, from, to } = req.query;
  console.log("Symbol", resolution);
  let time = [];
  let close = [];
  let open = [];
  let high = [];
  let low = [];
  let volume = [];

  let candles = await exchange.getCandles({
    instId: symbol.replace("/", "-"),
    bar: "15m",
    before: Number(from) * 1000,
    after: Number(to) * 1000,
    limit: 220,
  });
  console.log("Candles", candles);
  //   console.log("TO Candles", toCandles["data"][0]);
  //   console.log("From Candles", fromCandles["data"][0]);
  try {
    let candleList = candles["data"];
    candleList.forEach((elm) => {
      time.push(Number(elm[0]) / 1000);
      open.push(Number(elm[1]));
      high.push(Number(elm[2]));
      low.push(Number(elm[3]));
      close.push(Number(elm[4]));
      volume.push(Number(elm[5]));
    });
    res.json({
      s: "ok",
      t: time,
      c: close,
      o: open,
      h: high,
      l: low,
      v: volume,
    });
  } catch (error) {
    res.json({
      s: "ok",
      t: time,
      c: close,
      o: open,
      h: high,
      l: low,
      v: volume,
    });
  }
};
export const config = async (req, res) => {
  try {
    let configInfo = {
      exchanges: [
        {
          value: "PENDAX",
          name: "Pendax",
          desc: "Pendax Exchange",
        },
      ],
      symbols_types: [
        {
          value: "crypto",
          name: "Cryptocurrency",
        },
      ],
      supported_resolutions: [
        "1",
        "3",
        "5",
        "15",
        "30",
        "60",
        "120",
        "240",
        "360",
        "480",
        "720",
        "1D",
        "3D",
        "1W",
        "1M",
      ],
      supports_search: true,
      supports_group_request: false,
      supports_marks: false,
      supports_timescale_marks: false,
      supports_time: true,
    };
    res.json(configInfo);
  } catch (error) {}
};

export const timeFunc = (req, res) => {
  const time = Math.floor(Date.now() / 1000); // In seconds
  res.set("Content-Type", "text/plain").send(time.toString());
};
