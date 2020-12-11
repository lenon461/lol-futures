<template>
  <div class="about">
    <div>
      <TVChartContainer></TVChartContainer>
    </div>
    <div></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TVChartContainer from "@/components/TVChartContainer.vue";

@Component({
  components: {
    TVChartContainer
  }
})
export default class Home extends Vue {}
</script>
