const convertResolutionToApi = (resolution) => {
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

export { convertResolutionToApi };
