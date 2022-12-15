import { useEffect, useMemo, useRef, useState } from "react";
import { widget } from "../../public/static/charting_library";
import saveLoadAdapter from "./saveLoadAdapter";
import styles from "./index.module.css";
import { useMarket } from "../../providers/market";
const SHOW_ORDER_LINES_KEY = "showOrderLines-0.1";
const TRADE_EXECUTION_LIMIT = 100;
function getLanguageFromURL() {
  const regex = new RegExp("[\\?&]lang=([^&#]*)");
  const results = regex.exec(window.location.search);
  return results === null
    ? null
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}
//"http://localhost:3000/api/pendax/tv"
const TVChartContainer = () => {
  const { selectedMarket } = useMarket();
  const defaultProps = useMemo(
    () => ({
      symbol: selectedMarket.replace("-", "/"),
      interval: 60,
      datafeedUrl: "http://localhost:3500/okx/tv",
      auto_save_delay: 15,
      // datafeedUrl: "http://localhost:3000/api/pendax/tv",
      libraryPath: "/static/charting_library/",
      //chartsStorageUrl: "https://saveload.tradingview.com",
      chartsStorageApiVersion: "1.1",
      clientId: "tradingview.com",
      userId: "public_user_id",
      fullscreen: false,
      autosize: true,
      studiesOverrides: {},
      timeframe: "1D",
    }),
    [selectedMarket]
  );
  const tvWidgetRef = useRef(null);
  const [tvWidget, setTVWidget] = useState(null);

  // constructor(props) {
  // 	super(props);

  // 	this.ref = React.createRef();
  // }

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("Rendering..");
      const widgetOptions = {
        symbol: defaultProps.symbol,
        // BEWARE: no trailing slash is expected in feed URL
        datafeed: new window.Datafeeds.UDFCompatibleDatafeed(
          defaultProps.datafeedUrl
        ),
        interval: defaultProps.interval,
        container: tvWidgetRef.current,
        library_path: defaultProps.libraryPath,

        locale: getLanguageFromURL() || "en",
        disabled_features: ["use_localstorage_for_settings"],
        enabled_features: ["study_templates"],
        charts_storage_url: defaultProps.chartsStorageUrl,
        charts_storage_api_version: defaultProps.chartsStorageApiVersion,
        client_id: defaultProps.clientId,
        user_id: defaultProps.userId,
        fullscreen: defaultProps.fullscreen,
        autosize: defaultProps.autosize,
        studies_overrides: defaultProps.studiesOverrides,
        save_load_adapter: saveLoadAdapter,
      };

      const tvWidget = new widget(widgetOptions);
      setTVWidget(tvWidget);
      //this.tvWidget = tvWidget;

      tvWidget.onChartReady(() => {
        tvWidgetRef.current = tvWidget;
        tvWidget.headerReady().then(() => {
          tvWidget
            // @ts-ignore
            .subscribe("onAutoSaveNeeded", () => tvWidget.saveChartToServer());
          //const button = tvWidget.createButton();
          // button.setAttribute("title", "Click to show a notification popup");
          // button.classList.add("apply-common-tooltip");
          // button.addEventListener("click", () =>
          //   tvWidget.showNoticeDialog({
          //     title: "Notification",
          //     body: "TradingView Charting Library API works correctly",
          //     callback: () => {
          //       console.log("Noticed!");
          //     },
          //   })
          // );

          // button.innerHTML = "Check API";
        });
      });
    }
    return () => {
      if (tvWidget !== null) {
        tvWidget.remove();
        setTVWidget(null);
      }
    };
  }, []);
  useEffect(() => {
    if (
      tvWidgetRef.current &&
      tvWidgetRef.current.activeChart &&
      selectedMarket.replace("-", "/") !==
        tvWidgetRef.current.activeChart().symbol()
    ) {
      tvWidgetRef.current.setSymbol(
        selectedMarket.replace("-", "/"),
        tvWidgetRef.current.activeChart().resolution(),
        () => {
          // if (showOrderLines) {
          //   const openOrders =
          //     useMangoStore.getState().selectedMangoAccount.openOrders
          //   deleteLines()
          //   drawLinesForMarket(openOrders)
          // }
          // if (showTradeExecutions) {
          //   setCachedTradeHistory(tradeHistory)
          // }
        }
      );
    }
  }, [selectedMarket]);
  // componentWillUnmount() {
  // 	if (this.tvWidget !== null) {
  // 		this.tvWidget.remove();
  // 		this.tvWidget = null;
  // 	}
  // }

  return (
    <>
      <div ref={tvWidgetRef} className={styles.TVChartContainer} />
    </>
  );
};

export default TVChartContainer;
