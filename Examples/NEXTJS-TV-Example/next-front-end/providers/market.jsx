import React, { useContext, createContext } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { getApi } from "../utils/apiHelpers";

const MarketContext = createContext();
const MarketProvider = ({ children }) => {
  const [marketList, setMarketList] = useState([]);
  const [selectedMarket, setSelectedMarket] = useState("BTC/USDT");
  const initMarketList = async () => {
    let result = await getApi("okx/markets");
    if (result) {
      let { markets } = result;
      setMarketList(markets);
    }
  };
  useMemo(() => {
    initMarketList();
  }, []);
  return (
    <MarketContext.Provider
      value={{ marketList, setMarketList, selectedMarket, setSelectedMarket }}
    >
      {children}
    </MarketContext.Provider>
  );
};

const useMarket = () => {
  const { selectedMarket, setSelectedMarket, marketList, setMarketList } =
    useContext(MarketContext);

  return {
    selectedMarket,
    setSelectedMarket,
    marketList,
    setMarketList,
  };
};

export { useMarket, MarketProvider };
