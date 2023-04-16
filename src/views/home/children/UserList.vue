<template>
  <div>
    <el-table :data="tableData.listdata.slice((currentPage - 1) * pageSize, currentPage * pageSize)" style="width: 100%">

      <el-table-column prop="title" label="楼盘名称" />
      <el-table-column prop="type" label="类型" />
      <el-table-column prop="num" label="门牌号" />
      <el-table-column prop="hometype" label="户型" />
      <el-table-column prop="name" label="户主" />
      <el-table-column>
        <template #header>
          <el-input @change="searchLink" placeholder="请输入查询内容" v-model="search"></el-input>
        </template>
      </el-table-column>

    </el-table>
    <el-pagination v-model:currentPage="currentPage" v-model:page-size="pageSize"
      layout="->,total, prev, pager, next, jumper" :total="tableData.listdata.length"
       />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import link from '../../../api/Link'
const currentPage = ref(1)
let search = ref("")
const pageSize = ref(10)
let allData: any = []
let tableData = reactive({
  listdata: []
})
onMounted(() => {
  link('/userlist').then((res: any) => {
    console.log(res.data);
    allData = res.data
    tableData.listdata = allData
  })
})
// const handleCurrentChange = (val: number) => {
//   // currentPage.value = val
//   // console.log(currentPage.value===val);
// }
const searchLink = () => {
  if (search.value.trim() == '') {
    tableData.listdata = allData
  }
  else {
    link('/userlist', "get", {}, { name: search.value }).then((res: any) => {
      tableData.listdata = res.data
    })
  }
}



</script>

<style>

</style>