<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="auto">
        <LeftMenu/>
      </el-aside>
      <el-container>
        <el-header>
          <RightTop/>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import LeftMenu from '@/components/LeftMenu.vue';
import RightTop from '@/components/RightTop.vue';
</script>

<style lang="scss">
.el-aside{
  background-color:rgb(84, 92, 100);
}
.el-header{
  // background-color: blue;
}
.el-main{
  background-color: gainsboro;
}
.el-aside,.el-container,.common-layout,#app,html,body{
  height: 100%;
}
</style>