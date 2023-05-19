import axios from "axios";

let access_token = "";
if (process.browser) {
  access_token = localStorage.getItem("access_token");
}
axios.defaults.headers.common["x-app-name"] = "levelup";
axios.defaults.headers.common["x-app-version"] = "2.7";
axios.defaults.headers.common["x-app-type"] = "app";
axios.defaults.headers.common["x-device-platform"] = "web";
axios.defaults.headers.common["x-device-type"] = "desktop";
