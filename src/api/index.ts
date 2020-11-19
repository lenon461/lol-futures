import axios from "./axios";
// import Chart from "./chart"
export default {
  Chart: {
    getCandles(params: any) {
      return axios.get("/chart", {
        params
      });
    },
    getLPs(params: any) {
      return axios.get("/chart/lp", {
        params
      });
    }
  }
};
