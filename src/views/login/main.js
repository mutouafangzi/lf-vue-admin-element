import template from './index'


//二维码组件
import ImgCode from '@/vendor/imgCode'

export default {
  template: '<template/>',
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
      console.log('hhh')
      this.$refs.identifyCode.refreshCode()
      /*this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);*/
    },
    //登录按钮
    handleLogin(){
      console.log('点击了')
      this.$store.dispatch('Login', this.loginForm)
      .then(() => {
        console.log('成功')
        this.$router.push({ path: '/' })
      })
      .catch(() => {
        console.log('失败error');
      })
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

