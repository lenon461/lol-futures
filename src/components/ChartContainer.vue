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
// import { widget } from '../charting_library.min';
// lightweight-charts.esm.development.js
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

  private day = 15;
  created() {
    console.log("created");
  }
  mounted() {
    console.log("mounted");

    this.initChart();
    this.chart.timeScale().subscribeVisibleTimeRangeChange((param: any) => {
      console.log("param.from.day, param.to.day");
      console.log(param.from.day, param.to.day);
    });
  }

  public initChart() {
    this.candleSeries.setData([
      { time: "2020-10-10", open: 54.62, high: 55.5, low: 54.52, close: 54.9 },
      { time: "2020-10-11", open: 54.62, high: 55.5, low: 54.52, close: 54.9 },
      { time: "2020-10-12", open: 54.62, high: 55.5, low: 54.52, close: 54.9 },
      { time: "2020-10-13", open: 54.62, high: 55.5, low: 54.52, close: 54.9 },
      { time: "2020-10-14", open: 54.62, high: 55.5, low: 54.52, close: 54.9 }
    ]);
  }
  public updateChart(data: any) {
    const day = this.day;
    this.day++;
    this.candleSeries.update({
      time: `2020-10-${day}`,
      open: 54.62,
      high: 55.5,
      low: 54.52,
      close: 54.9
    });
  }
}
</script>

<style lang="scss" scoped>
.TVChartContainer {
  height: calc(100vh - 80px);
}
</style>
