<template>
  <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
        :collapse="!$store.state.HomeModules.navBool"
      >
        <template v-for="v in router.options.routes[1].children" :key="v.path">
          <el-sub-menu :index="v.path" v-if="v.children">
          <template #title>
            <el-icon><component :is="v.meta.icon"></component></el-icon>
            <span>{{v.meta.title}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item @click="push(item.name)" :index="item.path"  v-for="item in v.children" :key="item.path">{{item.meta.title}}</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>       
          <!-- <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group> -->
  
        <el-menu-item :index="v.path" v-else @click="push(v.name)">
          <el-icon><component :is="v.meta.icon"></component></el-icon>
          <span>{{v.meta.title}}</span>
        </el-menu-item>
        </template>
      </el-menu>
</template>

<script lang="ts" setup>
import 'element-plus/theme-chalk/index.css'
import { onMounted } from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {
  List,Grid,TrendCharts
} from '@element-plus/icons-vue'
let router = useRouter()
onMounted(()=>{
  console.log(router.options.routes[1].children);
  
})
//路由跳转
const push = (name:any) =>{
  router.push({
    name
  })
}
const handleOpen = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}
</script>

<style lang="scss">
.el-menu-vertical-demo{
    // width: 100%;
    // height: 100%;
    // overflow: hidden;
}
</style>