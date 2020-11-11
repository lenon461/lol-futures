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
export default class LPChart extends Vue {
  private chartHTMLElement = document.getElementById("chart") || document.body;
  private chart = createChart(this.chartHTMLElement, {
    width: 600,
    height: 300,
    crosshair: {
      mode: CrosshairMode.Normal
    }
  });
  private areaSeries = this.chart.addAreaSeries();
  private volumeSeries = this.chart.addHistogramSeries({});
  private feed = [];

  public logicalRangeValue = this.chart.timeScale().getVisibleLogicalRange();
  public lastStartTime = moment().subtract(120, "days");
  public lastUpdateTime = moment();
  created() {
    console.log("created");
  }
  mounted() {
    console.log("mounted");

    this.initChart();
    this.chart.timeScale().subscribeVisibleLogicalRangeChange(param => {
      // console.log("subscribeVisibleLogicalRangeChange");
    });

    this.chart.timeScale().subscribeVisibleTimeRangeChange((param: any) => {
      const TimeRange = this.chart.timeScale().getVisibleRange();
      const { from, to } = param;
      const visibleStartTime = moment(`${from.year}/${from.month}/${from.day}`);
      const visibleLastTime = moment(`${to.year}/${to.month}/${to.day}`);
      // if (Math.abs(visibleStartTime.diff(visibleLastTime, "days")) < 90) {
      //   this.updatePreviousChart(visibleStartTime);
      // }
    });
  }

  public async initChart() {
    const response = await Api.Chart.getLPs({
      from: this.lastStartTime.valueOf(),
      to: this.lastUpdateTime.valueOf()
    });
    this.feed = response.data;
    this.areaSeries.setData(this.feed);
  }

  public async updateChart(startTime: number) {
    const response = await Api.Chart.getCandles({
      time: this.lastUpdateTime.format("YYYY-MM-DD")
    });
    this.lastUpdateTime = this.lastUpdateTime.add(1, "days");
    const candle = response.data.pop();
    this.areaSeries.update(candle);
  }
}
</script>

<style lang="scss" scoped>
.TVChartContainer {
  height: calc(100vh - 80px);
}
</style>
