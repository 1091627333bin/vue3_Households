<template>
  <h2>每日访客统计</h2>
  <div id="charttwo" class="two"></div>
</template>

<script setup>
import { inject, onMounted, reactive } from 'vue'
import link from "@/api/Link"
let echarts = inject("echarts")
let xdata = reactive([])
let ydata = reactive([])
onMounted(() => {
  link("/chartDataTwo").then((res) => {
    // console.log(res.data);
    // data = res.data
    
    let mycharts2 = echarts.init(document.getElementById("charttwo"))
    mycharts2.setOption({
      xAxis: {
        type: "category",
        data: res.data.day,
        boundaryGap:false
      },
      yAxis: {
        type: "value",
        
      },
      tooltip:{},
      series: [
        {
          type: "line",
          name:"一般访客",
          data:res.data.num.一般访客
          
        },
        {
          type: "line",
          name:"外卖",
          data:res.data.num.外卖
          
        },
        {
          type: "line",
          name:"快递",
          data:res.data.num.快递
          
        },
        {
          type: "line",
          name:"授权访客",
          data:res.data.num.授权访客
          
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

.two {
  height: 4.5rem;
}
</style>