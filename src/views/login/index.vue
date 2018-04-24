<!--  -->
<template>
  <div class="login-container">
    <el-container>
      <el-form ref="loginForm" :model="loginForm" label-width="180px" class="login-form">
        <el-form-item label="用户名" prop="loginName">
          <el-input v-model="loginForm.loginName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="loginPassword">
          <el-input v-model="loginForm.loginPassword"></el-input>
        </el-form-item>
      </el-form>
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
<style scoped>

</style>