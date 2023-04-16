<template>
  <h2>报修统计</h2>
  <div id="chartthree" class="three"></div>
</template>

<script setup>
import { inject, onMounted, reactive } from 'vue'
import link from "@/api/Link"
let echarts = inject("echarts")
// let xdata = reactive([])
// let ydata = reactive([])
onMounted(() => {
  link("/chartDataThree").then((res) => {
    // console.log(res.data);
    // data = res.data
    // xdata = res.data.map((item)=>{
    //   return item.value
    // })
    // ydata = res.data.map((item)=>{
    //   return item.name
    // })
    let mycharts3 = echarts.init(document.getElementById("chartthree"))
    mycharts3.setOption({
      tooltip:{},
      series: [
        {
          type: "pie",
          data:res.data
          
        },
        
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

.three {
  height: 4rem;
}
</style>