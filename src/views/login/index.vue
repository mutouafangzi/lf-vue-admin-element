<!--  -->
<template>
  <div class="login-container">
    <el-container>
      <el-aside width="400px">ONE TEST AREA</el-aside>
      <el-main>
        <div>
          <el-form ref="loginForm" :model="loginForm" class="login-form">
            <el-form-item prop="loginName">
              <el-input v-model="loginForm.loginName" prefix-icon="iconfont icon-yonghu"></el-input>
            </el-form-item>
            <el-form-item prop="loginPassword">
              <el-input v-model="loginForm.loginPassword" prefix-icon="iconfont icon-mima"></el-input>
            </el-form-item>
            <el-form-item prop="authCode">
              <el-input v-model="loginForm.authCode" prefix-icon="iconfont icon-auth-code" style="display:inline-block;width:70%"></el-input>
              
              <div id="qrcode"  
              style="display:inline-block;width:100px;height:40px;vertical-align:middle">
                <ImgCode 
                :identifyCode="identifyCode" 
                :width="contentWidth" 
                :height="contentHeight"
                :click="refreshCode"></ImgCode>
              </div>
            </el-form-item>
            <el-form-item prop="isRember">
              <el-checkbox v-model="loginForm.isRember">记住用户名</el-checkbox>
            </el-form-item>
            <el-button></el-button>
          </el-form>
        </div>
        
      </el-main>
    </el-container>
  </div>
</template>

<script>

//二维码组件
import ImgCode from '@/vendor/imgCode' 

export default {
  data () {
    return {
      loginForm:{},
      //随机数
      identifyCodes: "1234567890",
      identifyCode: "",
      //随机码的长和宽，需要传给子组件
      contentWidth: 100,
      contentHeight: 45,
    }
  },

  computed: {},

  methods: {
    //二维码生成
    /* randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
      console.log(this.identifyCode);
    } */
    
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
<style rel="stylesheet/scss" lang="scss">
  $bg:#F2F2F2;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container{
    position: fixed;
    height: 100%;
    width:100%;
    background-color: $bg;
    input {
      background: transparent;
      //border: 0px;
      -webkit-appearance: none;
      border-radius: 5px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
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
        background: url("../../assets/loginIn/cat.png") no-repeat;
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