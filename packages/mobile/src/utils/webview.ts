import { getUA, isMobile } from "react-device-detect";

const CBNU_ALRAMI_APP_USER_AGENT = "cbnu-alrami-app";

const isWebView = isMobile && getUA.indexOf(CBNU_ALRAMI_APP_USER_AGENT) > -1;
const isDev = process.env.NODE_ENV === "development";

export { isWebView, isDev };