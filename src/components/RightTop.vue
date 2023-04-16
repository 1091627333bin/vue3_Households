<template>
  <div>
    <el-icon v-if="$store.state.HomeModules.navBool" @click="ck"><ArrowRightBold /></el-icon>
    <el-icon v-else @click="ck"><ArrowLeftBold /></el-icon>
  </div>
</template>

<script lang="ts" setup>
import {
  ArrowRightBold,ArrowLeftBold
} from '@element-plus/icons-vue'
import { ref } from '@vue/reactivity'
import {mapMutations, useStore} from 'vuex'
let store = useStore()

let ck = ()=>{
  store.commit("CK")
  
}
</script>

<style lang="scss">
.el-header{
  line-height: 60px;
}
</style>