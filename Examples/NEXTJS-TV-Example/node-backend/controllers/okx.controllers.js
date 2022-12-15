import exchange from "../utils/exchange.js";
const getAllMarkets = async (req, res) => {
  try {
    let markets = await exchange.getMarkets();

    //console.log("markets", markets);
    res.json({
      markets: markets,
      success: true,
    });
  } catch (error) {
    res.json({
      error: error.message,
      success: false,
    });
  }
};

const getOrderHistory = async (req, res) => {
  try {
    let { instId } = req.query;
    let orders = await exchange.getTrades({
      instId,
    });

    res.json(orders);
  } catch (error) {
    console.log("error", error);
    res.json({
      error: error.message,
      success: false,
    });
  }
};

export { getAllMarkets, getOrderHistory };
