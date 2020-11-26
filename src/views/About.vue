<template>
  <div class="about">
    <div>
      <TVChartContainer></TVChartContainer>
    </div>
    <div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TVChartContainer from "@/components/TVChartContainer.vue"; // @ is an alias to /src
// import ChartContainerAuto from "@/components/ChartContainerAuto.vue"; // @ is an alias to /src

@Component({
  components: {
    TVChartContainer
    // ChartContainerAuto
  }
})
export default class Home extends Vue {}
</script>
