export default function handler(req, res) {
  if (req.method == "GET") {
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
  }
}
