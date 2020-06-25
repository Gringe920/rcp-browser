import { RippleAPI } from "ripple-lib";
import { SERVER } from "./constants";

let wsURL = 'ws://wss1.rcproto.org';
if(typeof location == 'object' && /https/.test(location.href)){
    wsURL = 'wss://wss1.rcproto.org';
}

const API = new RippleAPI({
  server: wsURL
});


export default API;