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

<style rel="stylesheet/scss" lang="scss">
</style>
