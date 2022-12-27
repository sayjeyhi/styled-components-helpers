import UAParser, { IBrowser, IOS } from "ua-parser-js";

export enum DeviceTypes {
  CONSOLE = "console",
  MOBILE = "mobile",
  TABLET = "tablet",
  SMARTTV = "smarttv",
  WEARABLE = "wearable",
  EMBEDDED = "embedded",
  NONE = "",
}

// can be added if need
export enum OSTypes {
  WINDOWS = "Windows",
  MACOS = "Mac OS",
  LINUX = "Linux",
  IOS = "iOS",
  ANDROID = "Android",
}

/**
 * Will give device name
 */
export const getDeviceName = () => {
  const uaParser = new UAParser();
  return (uaParser.getDevice()?.type as DeviceTypes) || "";
};

/**
 * Will give browser info
 */
export const getBrowser = (): IBrowser => {
  const uaParser = new UAParser();
  return uaParser.getBrowser();
};

/**
 * Will give OS info
 */
export const getOs = (): IOS => {
  const uaParser = new UAParser();
  return uaParser.getOS();
};

export const isMobile = () => {
  return getDeviceName() === DeviceTypes.MOBILE;
};

export const isTablet = () => {
  return getDeviceName() === DeviceTypes.TABLET;
};

/**
 * Will tell us if browser has required features
 */
export const doWeSupportThisBrowser = () => {
  const hasArrowFn = () => {
    try {
      // eslint-disable-next-line no-new-func
      Function("() => {};");
      return true;
    } catch (exception) {
      return false;
    }
  };
  const hasSpread = () => {
    try {
      // eslint-disable-next-line no-new-func
      Function("foo(...params);");
      return true;
    } catch (e) {
      return false;
    }
  };
  const hasSet = () => {
    return (
      typeof Set !== "undefined" && typeof Set.prototype.keys === "function"
    );
  };
  return (
    hasSet() &&
    hasArrowFn() &&
    hasSpread() &&
    Boolean(window.Promise) &&
    Boolean(window.fetch) &&
    Boolean(window.Symbol)
  );
};
