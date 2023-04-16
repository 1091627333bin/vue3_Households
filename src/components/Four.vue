<template>
  <h2>报修统计</h2>
  <div id="chartfour" class="four"></div>
</template>

<script setup>
import { inject, onMounted, reactive } from 'vue'
import link from "@/api/Link"
let echarts = inject("echarts")
// let xdata = reactive([])
// let ydata = reactive([])
onMounted(() => {
  link("/chartDataFour").then((res) => {
    console.log(res.data);
    // data = res.data
    // xdata = res.data.map((item)=>{
    //   return item.value
    // })
    // ydata = res.data.map((item)=>{
    //   return item.name
    // })
    let mycharts3 = echarts.init(document.getElementById("chartfour"))
    mycharts3.setOption({
      tooltip:{},
      xAxis: {
        type: "category",
        data: res.data.day
      },
      yAxis: {
        type: "value",               
      },
      legend:{},
      series: [
        {
          type: "bar",
          name:"一般用户",
          data:res.data.num.一般用户         
        },
        {
          type: "bar",
          name:"月租用户",
          data:res.data.num.月租用户         
        },
        {
          type: "bar",
          name:"特殊车辆",
          data:res.data.num.特殊车辆         
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

.four {
  height: 4rem;
}
</style>