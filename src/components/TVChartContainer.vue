<template>
  <div class="TVChartContainer">
    hi
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {
  createChart,
  CrosshairMode,
  IChartApi,
  ISeriesApi
} from "lightweight-charts";
import moment from "moment";
import Api from "../api";
import socket from "../api/socket";

@Component
export default class LPChart extends Vue {
  private chartHTMLElement = document.getElementById("chart") || document.body;
  private chart = createChart(this.chartHTMLElement, {
    width: 600,
    height: 300
  });
  private lineSeries = this.chart.addLineSeries();
  private feed: any = [];

  created() {
    console.log("created");
    socket.init();
  }
  mounted() {
    console.log("mounted");
    this.initChart();
    this.updateLine();

    this.chart.timeScale().subscribeVisibleLogicalRangeChange((param: any) => {
      console.log("subscribeVisibleLogicalRangeChange");
      console.log(param);
    });
  }

  public async initChart() {
    const response = await Api.Chart.getLPs({});
    this.feed = response.data;
    this.lineSeries.setData(this.feed);

    this.chart.timeScale().subscribeVisibleTimeRangeChange((param: any) => {
      // console.log("subscribeVisibleTimeRangeChange");
      // console.log(`${param.from.year}-${param.from.month}-${param.from.day} ${param.to.year}-${param.to.month}-${param.to.day}`)
    });
  }
  public async updateLine() {
    const updateCallback = (...args) => {
      this.lineSeries.update(args[0]);
    };
    socket.on("Faker@kline", updateCallback);
  }

  public SocketEmit() {
    let count = 1;

    setInterval(() => {
      socket.emit("Faker@kline", { count: count++ });
    }, 1000);
  }
  public async loadPrevData() {
    const response = await Api.Chart.getLPs({ to: "2019-05-07", count: 100 });
    this.feed = [...response.data, ...this.feed];
    this.lineSeries.setData(this.feed);
  }
}
</script>

<style lang="scss" scoped>
.TVChartContainer {
  height: calc(100vh - 80px);
}
</style>
