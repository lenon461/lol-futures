<template>
  <div class="ChartContainer">
    <div id="chart" />
    <button @click="test">test</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {
  createChart,
  CrosshairMode,
  IChartApi,
  ISeriesApi,
} from "lightweight-charts";
import moment from "moment";
import Api from "../api";
import socket from "../api/socket"

@Component
export default class LPChart extends Vue {
  private chartHTMLElement = document.getElementById("chart") || document.body;
  private chart = createChart(this.chartHTMLElement, {
    width: 600,
    height: 300,
  });
  private areaSeries = this.chart.addAreaSeries();
  private feed = [];

  created() {
    console.log("created");
    socket.init();
  }
  mounted() {
    console.log("mounted");
    this.initChart();
  }

  public async initChart() {
    const response = await Api.Chart.getLPs({});
    this.feed = response.data;
    this.areaSeries.setData(this.feed);
  }
  public test() {
    socket.emit();
  }
}
</script>

<style lang="scss" scoped>
.TVChartContainer {
  height: calc(100vh - 80px);
}
</style>
