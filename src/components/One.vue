<template>
  <h2>人数统计</h2>
  <div id="chartone" class="one"></div>
</template>

<script setup>
import { inject, onMounted, reactive } from 'vue'
import link from "@/api/Link"
let echarts = inject("echarts")
let xdata = reactive([])
let ydata = reactive([])
onMounted(() => {
  link("/chartDataOne").then((res) => {
    // console.log(res.data);
    // data = res.data
    xdata = res.data.map((item) => {
      return item.title
    })
    ydata = res.data.map((item) => {
      return item.num
    })
    let mycharts = echarts.init(document.getElementById("chartone"))
    mycharts.setOption({
      xAxis: {
        type: "category",
        data: xdata
      },
      yAxis: {
        type: "value",
        
      },
      series: [
        {
          type: "bar",
          data: ydata
        }
      ]
    })
  })
})
</script>

<style lang="scss" scoped>
h2 {
  height: 0.6rem;
  color: #fff;
  line-height: 0.6rem;
  text-align: center;
  font-size: 0.25rem;
}

.one {
  height: 4.5rem;
}
</style>