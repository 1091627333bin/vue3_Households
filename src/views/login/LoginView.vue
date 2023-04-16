<template>
  <div class="login">
    <div class="login-con">
      <ul class="menu-tab">
        <li v-for="v in menuDaa" :key="v.type" :style="{ background: v.current ? 'skyblue' : '' }"
          @click="clickMenu(v)">
          {{ v.txt }}
        </li>
      </ul>

      <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" class="demo-ruleForm">

        <el-form-item prop="username">
          <label>邮箱</label>
          <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
        </el-form-item>

        <el-form-item prop="pass">
          <label>密码</label>
          <el-input v-model="ruleForm.pass" type="password" autocomplete="off" minlength="6" maxlength="15" />
        </el-form-item>

        <el-form-item prop="checkPass" v-show="model == 'register'">
          <label>重复密码</label>
          <el-input minlength="6" maxlength="15" v-model="ruleForm.checkPass" type="password" />
        </el-form-item>

        <el-form-item>
          <el-button :disabled="btnbool" type="primary" @click="submitForm(ruleFormRef)">{{ model == 'login' ? '登陆' : '注册' }}</el-button>

        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref,watch } from "vue";
import type { FormInstance } from 'element-plus'
import { CheckUser, CheckPass } from "../../utils/verfifcation.js"
import link from '../../api/Link.js'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import userMd5 from '../../hook/index.js'
import { useRouter } from "vue-router";
let router = useRouter()
const ruleFormRef = ref<FormInstance>()
const validateUser = (rule: any, value: any, callback: any) => {

  // 创建邮箱正则来进行邮箱格式校验

  if (!value) {
    return callback(new Error("邮箱不能为空！！"));
  } else if (!CheckUser(value)) {
    return callback(new Error("邮箱格式有误！！"));
  } else {
    callback();
  }
}
// 密码验证
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("密码不能为空"));
  } else if (!CheckPass(value)) {
    callback(new Error("密码格式有误!6至15位的字母+数字"));
  } else {
    callback();
  }
}
// 密码确认验证
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (model.value === 'login') {
    callback()
  }
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== ruleForm.pass) {
    callback(new Error("密码不一致!"))
  } else {
    callback()
  }
}


const ruleForm = reactive({
  username: '',
  pass: '',
  checkPass: '',
})

const rules = reactive({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
  username: [{ validator: validateUser, trigger: 'blur' }],
})

// 点击登录
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      // console.log(formEl)
      if (model.value == 'login') {
        
        let result = await link(`/register?name=${ruleForm.username}&pwd=${userMd5(ruleForm.pass).value}`)
        console.log(result);
        if(result.data.length>0){
          console.log('登录成功'); 
          router.push('/home')         
        }
        else{
          ElMessage.warning('用户名或密码有误')
        }
        

      }
      else {
        let data = {
          name: ruleForm.username,
          pwd: userMd5(ruleForm.pass).value
        }
        const result = await link('/register', 'post', data)
        if (Object.keys(result.data).length !== 0) {
          ElMessage({
            message: '注册成功',
            type: 'success',
          })
          clickMenu(menuDaa[0])
        }
        else {
          console.log('注册失败');

        }

      }
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const menuDaa = reactive([
  { txt: '登陆', current: true, type: 'login' },
  { txt: '注册', current: false, type: 'register' }
])
// 定义当前状态
let model = ref('login')

// 点击切换
const clickMenu = (v: any) => {
  menuDaa.forEach((item) => {
    item.current = false
  })
  v.current = true
  model.value = v.type
  ruleForm.username = ''
  ruleForm.pass = ''
  ruleForm.checkPass = ''
}
//定义是否能点击登录注册的状态
let btnbool = ref(true)
//监听Form表单
watch(ruleForm,(newvalue)=>{
  // console.log(newvalue);
  if(model.value =='login'){
    if(ruleForm.username!='' && ruleForm.pass!=''){
      btnbool.value = false
    }
    else{
      btnbool.value = true
    }
  }
  else{
    if(ruleForm.username!='' && ruleForm.pass!=''&& ruleForm.checkPass!=''){
      btnbool.value = false
    }
    else{
      btnbool.value = true
    }
  }
  
})




</script>

<style lang="scss">
html,
body,
#app.login {
  height: 100%;
}

.menu-tab {
  text-align: center;

  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: black;
    border-radius: 2px;
    cursor: pointer;
  }
}

.demo-ruleForm {
  width: 30%;
  margin: 50px auto;
}
</style>