<!--  -->
<template>
  <div class="login-container">
    <el-container>
      <el-aside width="400px">ONE TEST AREA</el-aside>
      <el-main>
        <div>
          <el-form ref="loginForm" :model="loginForm" class="login-form">
            <el-form-item prop="loginName">
              <el-input v-model="loginForm.loginName" prefix-icon="el-icon-date"></el-input>
            </el-form-item>
            <el-form-item prop="loginPassword">
              <el-input v-model="loginForm.loginPassword"></el-input>
            </el-form-item>
          </el-form>
        </div>
        
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm:{
        loginName:'',
        loginPassword:''
      }
    }
  },

  computed: {},

  methods: {},

  components: {},
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
    .el-container{
      background-color: #FFFFFF;
      border: 1px solid #E5E5E5;
      width: 900px;
      height: 420px;
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
        background-size: 420px 420px;
        line-height: 410px;
        text-align: center;
        font-size: 45px;
        font-weight: bolder;
        font-family:"Times New Roman",Georgia,Serif;
        color: rgb(59, 48, 48)
      }
      .el-main{
        .login-form{

        }
      }
      
    }
  }
  

</style>