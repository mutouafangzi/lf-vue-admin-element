<!--  -->
<template>
  <div class="login-container">
    <el-container>
      <el-aside width="400px">ONE TEST AREA</el-aside>
      <el-main>
        <div>
          <el-form ref="loginForm" :model="loginForm" class="login-form">
            <el-form-item prop="username">
              <el-input v-model="loginForm.username" prefix-icon="iconfont icon-yonghu"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="loginForm.password" prefix-icon="iconfont icon-mima"></el-input>
            </el-form-item>
            <el-form-item prop="authCode">
              <el-input v-model="loginForm.authCode" prefix-icon="iconfont icon-auth-code" style="display:inline-block;width:70%"></el-input>
              <div id="qrcode"
                   @click="refreshCode"
                  style="display:inline-block;width:100px;height:40px;vertical-align:middle">
                <ImgCode
                :identifyCode="identifyCode"
                v-bind:contentWidth="contentWidth"
                v-bind:contentHeight="contentHeight"
                ref="identifyCode"></ImgCode>
              </div>
            </el-form-item>
            <el-form-item prop="isRember">
              <el-checkbox v-model="loginForm.isRember" style="display:inline-block;">记住用户名</el-checkbox>
              <div style="display:inline-block;width:100px;margin-left:150px;"><a href="####">忘记密码</a></div>
            </el-form-item>
            <el-button type="primary" style="width:380px;margin-left:30px" @click="handleLogin">登陆</el-button>
          </el-form>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
//二维码组件
import ImgCode from '@/vendor/imgCode'
import { LOGIN } from "@/api/login.js";

export default {
  name: 'login',
  data () {
    return {
      loginForm:{
        username: 'admin',
        password: 'admin',
        isRember: '',
        authCode: '',
      },
      //随机数
      identifyCodes: "1234567890",
      identifyCode: "",
      //随机码的长和宽，需要传给子组件
      contentWidth: 100,
      contentHeight: 40,
    }
  },

  computed: {},

  methods: {
    //二维码生成
    /* randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },*/
    refreshCode() {
      this.$refs.identifyCode.refreshCode()
      /*this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);*/
    },
    async login(userInfo){
      let user_info = await LOGIN(userInfo)
      this.user_info = user_info
      console.log('请求回来的值是', user_info)
    },
    //登录按钮
    handleLogin(){
      let that = this
      that.$store.dispatch('Login', this.loginForm)
        .then(() => {
          console.log('成功', this.$router)
          window.sessionStorage.setItem('permission', 'sssss')
          that.$router.push({ path: '/dashboard' })
        })
        .catch(() => {
          console.log('失败error');
        })
      // this.login(this.loginForm)
      // .then(()=>{console.log('成功了')})
      // .catch(()=>{console.log('失败了')})
    }

  },

  mounted () {
    /* this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4); */
  },

  components: {
    ImgCode
  },
}
</script>
<style lang='scss' scoped>
.login-container{
  position: fixed;
  height: 100%;
  width:100%;
  background-color: #F2F2F2;
  input {
    background: transparent;
    //border: 0px;
    -webkit-appearance: none;
    border-radius: 5px;
    padding: 12px 5px 12px 15px;
    color: #eee;
    height: 47px;
  }
  .el-container{
    background-color: #FFFFFF;
    border: 1px solid #E5E5E5;
    width: 900px;
    height: 435px;
    position: absolute;
    /* left: 50%;
    top: 50%;
    margin-left: -200px;
    margin-top: -200px; */
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    .el-aside{
      background: url("../../assets/images/loginIn/cat.png") no-repeat;
      background-size: 420px 435px;
      line-height: 410px;
      text-align: center;
      font-size: 45px;
      font-weight: bolder;
      font-family:"Times New Roman",Georgia,Serif;
      color: rgb(59, 48, 48)
    }
    .el-main{
      .el-form-item{
        margin-bottom: 10px;
        .el-form-item__content{
          width:80%;
          padding-left: 30px;
        }
      }
      .el-input{
        margin-top: 30px;
        .iconfont{
          font-size: 25px;
        }
      }
    }

  }
}
</style>
