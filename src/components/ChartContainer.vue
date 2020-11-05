<template>
  <div class="ChartContainer">
    <div id="chart" />
    <button @click="updateChart">test</button>
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

@Component
export default class ChartContainer extends Vue {
  private chartHTMLElement = document.getElementById("chart") || document.body;
  private chart = createChart(this.chartHTMLElement, {
    width: 600,
    height: 300,
    crosshair: {
      mode: CrosshairMode.Normal
    }
  });
  private candleSeries = this.chart.addCandlestickSeries();
  private feed = [];

  public lastUpdateTime = moment();
  created() {
    console.log("created");
  }
  mounted() {
    console.log("mounted");

    this.initChart();
    this.chart.timeScale().subscribeVisibleTimeRangeChange((param: any) => {
      // console.log("param.from.day, param.to.day");
      // console.log(param.from.day, param.to.day);
    });
  }

  public async initChart() {
    const response = await Api.Chart.getCandles({});
    this.feed = response.data;
    this.candleSeries.setData(this.feed);
  }
  public async updateChart(data: any) {
    const response = await Api.Chart.getCandles({
      time: this.lastUpdateTime.format("YYYY-MM-DD")
    });
    this.lastUpdateTime = this.lastUpdateTime.add(1, "days");
    const candle = response.data.pop();
    this.candleSeries.update(candle);
  }
}
</script>

<style lang="scss" scoped>
.TVChartContainer {
  height: calc(100vh - 80px);
}
</style>
