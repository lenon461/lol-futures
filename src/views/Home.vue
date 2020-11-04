<template>
  <div class="home">
    <div>
      <ChartContainer></ChartContainer>
    </div>
    <div>
      <!-- <ChartContainerAuto></ChartContainerAuto> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ChartContainer from "@/components/ChartContainer.vue"; // @ is an alias to /src
// import ChartContainerAuto from "@/components/ChartContainerAuto.vue"; // @ is an alias to /src

@Component({
  components: {
    ChartContainer
    // ChartContainerAuto
  }
})
export default class Home extends Vue {}
</script>
