import UAParser from "ua-parser-js";
export declare enum DeviceTypes {
    CONSOLE = "console",
    MOBILE = "mobile",
    TABLET = "tablet",
    SMARTTV = "smarttv",
    WEARABLE = "wearable",
    EMBEDDED = "embedded",
    NONE = ""
}
export declare enum OSTypes {
    WINDOWS = "Windows",
    MACOS = "Mac OS",
    LINUX = "Linux",
    IOS = "iOS",
    ANDROID = "Android"
}
/**
 * Will give device name
 */
export declare const getDeviceName: () => DeviceTypes.CONSOLE | DeviceTypes.MOBILE | DeviceTypes.TABLET | DeviceTypes.SMARTTV | DeviceTypes.WEARABLE | DeviceTypes.EMBEDDED | "";
/**
 * Will give browser info
 */
export declare const getBrowser: () => UAParser.IBrowser;
/**
 * Will give OS info
 */
export declare const getOs: () => UAParser.IOS;
export declare const isMobile: () => boolean;
export declare const isTablet: () => boolean;
/**
 * Will tell us if browser has required features
 */
export declare const doWeSupportThisBrowser: () => boolean;
