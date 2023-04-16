<template>
  <div>
    <el-table :data="tableData.listdata.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
      style="width: 100%">

      <el-table-column prop="title" label="楼盘名称" />
      <el-table-column prop="type" label="类型" />
      <el-table-column prop="num" label="门牌号" />
      <el-table-column prop="hometype" label="户型" />
      <el-table-column prop="name" label="户主" />
      <el-table-column label="设置">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:currentPage="currentPage" v-model:page-size="pageSize"
      layout="->,total, prev, pager, next, jumper" :total="tableData.listdata.length"
      @current-change="handleCurrentChange" />

    <el-dialog v-model="dialogFormVisible" title="修改用户信息">
      <el-form :model="currentRow.CR">
        <el-form-item label="楼盘名称" :label-width="formLabelWidth">
          <el-input v-model="currentRow.CR.title" autocomplete="off" />
        </el-form-item>

        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-input v-model="currentRow.CR.type" autocomplete="off" />
        </el-form-item>

        <el-form-item label="门牌号" :label-width="formLabelWidth">
          <el-input v-model="currentRow.CR.num" autocomplete="off" />
        </el-form-item>

        <el-form-item label="户型" :label-width="formLabelWidth">
          <el-input v-model="currentRow.CR.hometype" autocomplete="off" />
        </el-form-item>

        <el-form-item label="户主" :label-width="formLabelWidth">
          <el-input v-model="currentRow.CR.name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="updateUser">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'

import { onMounted, reactive, ref } from 'vue'
import link from '../../../api/Link'
const currentPage = ref(1)
let search = ref("")
const pageSize = ref(10)
let allData: any = []
let currentRow = reactive({
  CR: {}
})

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
const handleCurrentChange = (val: number) => {
  // currentPage.value = val
  // console.log(currentPage.value===val);
}

const handleEdit = (index: number, row: any) => {
  dialogFormVisible.value = true
  currentRow.CR = { ...row }//使用浅拷贝
  // console.log(index, row)
}
const handleDelete = (index: number, row: any) => {
  ElMessageBox.confirm(
    '确定要删除吗?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {     
      link(`/userlist/${row.id}`, 'DELETE').then((res: any) => {
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
        window.location.reload()
      })
    })
}

const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

const updateUser = () => {
  // console.log(currentRow.CR);
  link(`/userlist/${currentRow.CR.id}`, 'PUT', { ...currentRow.CR }).then((res: any) => {
    ElMessage.success('修改成功')
    dialogFormVisible.value = false
    window.location.reload()
  })


  console.log({ ...currentRow.CR });



}
</script>

<style scoped>
.el-button--text {
  margin-right: 15px;
}

.el-select {
  width: 300px;
}

.el-input {
  width: 300px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>