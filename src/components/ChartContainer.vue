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

  public logicalRangeValue = 90;
  public lastStartTime = moment().subtract(120, "days");
  public lastUpdateTime = moment();
  created() {
    console.log("created");
  }
  mounted() {
    console.log("mounted");

    this.initChart();
    this.chart.timeScale().subscribeVisibleLogicalRangeChange(param => {
      this.logicalRangeValue = Math.floor(param!.to - param!.from);
    });

    this.chart.timeScale().subscribeVisibleTimeRangeChange((param: any) => {
      const TimeRange = this.chart.timeScale().getVisibleRange();
      const { from, to } = param;
      const visibleStartTime = moment(`${from.year}/${from.month}/${from.day}`);
      const visibleLastTime = moment(`${to.year}/${to.month}/${to.day}`);
      if (Math.abs(visibleStartTime.diff(visibleLastTime, "days")) < 90) {
        console.log(visibleStartTime.diff(visibleLastTime, "days"));
        this.updatePreviousChart(visibleStartTime);
      }
    });
  }

  public async initChart() {
    const response = await Api.Chart.getCandles({
      from: this.lastStartTime.valueOf(),
      to: this.lastUpdateTime.valueOf()
    });
    this.feed = response.data;
    this.candleSeries.setData(this.feed);
  }
  public async updatePreviousChart(visibleStartTime: moment.Moment) {
    console.log({
      from: visibleStartTime
        .subtract(this.logicalRangeValue, "days")
        .toLocaleString(),
      to: visibleStartTime.toLocaleString()
    });
    const response = await Api.Chart.getCandles({
      from: 1586044400000,
      to: visibleStartTime.valueOf()
    });
    this.lastUpdateTime = this.lastUpdateTime.add(1, "days");
    const candle = response.data.pop();
    this.candleSeries.update(candle);
  }

  public async updateChart(startTime: number) {
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
