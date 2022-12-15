import exchange from "../../../utils/exchange";
import { convertResolutionToApi } from "../../../utils/resolution";

export default async function handler(req, res) {
  let { symbol, resolution, from, to } = req.query;

  let time = [];
  let close = [];
  let open = [];
  let high = [];
  let low = [];
  let volume = [];
  let converted = convertResolutionToApi(resolution);
  console.log("Converted", converted);
  let candles = await exchange.getCandles({
    instId: symbol.replace("/", "-"),
    bar: converted,
    before: Number(from) * 1000,
    after: Number(to) * 1000,
    limit: 220,
  });

  //   console.log("TO Candles", toCandles["data"][0]);
  //   console.log("From Candles", fromCandles["data"][0]);
  try {
    let candleList = candles["data"];
    console.log("Candle List", candleList);
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
}
