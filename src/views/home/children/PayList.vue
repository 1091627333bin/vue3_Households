<template>
  <div class="content">
    <div class="inputDom">
      <el-input v-model="input" placeholder="请输入收款金额"></el-input>
      <el-button type="success" class="button1" @click="makeQrcode">生成二维码</el-button>
    </div>
    <div class="qrcode" ref="qrcodeDom"></div>
  </div>
</template>

<script setup>
import {ref,nextTick} from 'vue'
import QRcode from 'qrcodejs2'
const input = ref('')
let qrcodeDom = ref(null)
let makeQrcode = ()=>{
  qrcodeDom.value.innerHTML=''
  nextTick(()=>{
    new QRcode(qrcodeDom.value,{
      text:input.value,
      colorDark:"#000",
      colorLight:"#fff",
      // correctLevel:QRcode.correctLevel.H
    })
  })
}
</script>

<style lang="scss">
.qrcode{
  width: 300px;
  height: 300px;
  margin: 0 auto;
  // text-align: center;
}
.inputDom{
  width: 300px;
  margin: 0 auto;
  
}
.content{
  text-align: center;
}
.button1{
  margin: 10px 0;
}
</style>