<!--  -->
<template>
  <div class="img-canvas">
    <canvas id="qrcanvas" :width="contentWidth" :height="contentHeight" @click.native="refreshCode"></canvas>
  </div>
</template>

<script>
export default {
  data () {
    return {
      //imgCode
      imgCode: [1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f","j","h","i","g","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
      /* {
        type: Array,
        default: [1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f","j","h","i","g","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
      }, */


      //随机数字体大小的范围
      fontSizeMin: 25,
      /* {
        type: Number,
        default: 16
      }, */
      fontSizeMax: 40,
      /* {
        type: Number,
        default: 40
      }, */

      //rgb颜色的范围
      colorMin: 50,
      /* {
        type: Number,
        default: 50
      }, */
      colorMax: 160,
      /* {
        type: Number,
        default: 160
      }, */
      //背景色的rgb随机的范围
      backgroundColorMin:180,
      /* {
        type: Number,
        default: 180
      }, */
      backgroundColorMax:240,
      /* {
        type: Number,
        default: 240
      }, */
      //绘制的线条的颜色取值范围
      lineColorMin: 40,
      /* {
        type: Number,
        default: 40
      }, */
      lineColorMax: 180,
      /* {
        type: Number,
        default: 180
      }, */
      //绘制背景的长和宽的范围
      //contentWidth: 100,
      /* {
        type: Number,
        default: 100
      }, */
      //contentHeight: 45,
      /* {
        type: Number,
        default: 40
      } */
    };
  },
  //接收父组件传来的数据，二维码的宽和高
  props:{
    contentWidth:{
        type: Number,
        default: 100
      },
    contentHeight:{
        type: Number,
        default: 40
      }
    },

  methods: {
    //生成随机数
    randomNum(min,max){
      return Math.floor(Math.random()*(max-min)+min)
    },
    //生成一个随机颜色
    randomColor(min,max){
      let r=this.randomNum(min,max);
      let g=this.randomNum(min,max);
      let b=this.randomNum(min,max);
      return 'rgb('+ r + ',' + g + "," + b + ")"
    },
    //绘制随机数
    drawText(ctx, txt, i){
      //随机数颜色
      ctx.fillStyle = this.randomColor(0, 55)
      //随机数大小
      ctx.font = this.randomNum(this.fontSizeMin, this.fontSizeMax) + 'px SimHei'
      //随机数存在的位置，X代表每个数字横向开始的位置
      let x = (i + 1) * this.contentWidth / 5
      console.log(x);
      //X代表每个数字纵向开始的位置
      let y = this.randomNum(this.fontSizeMax, this.contentHeight - 5)
      //每个文字可以旋转的角度
      let deg = this.randomNum(-40, 40)
      //变换文字生成的原点和旋转角度
      ctx.translate(x,y)
      ctx.rotate(deg * Math.PI / 180)
      ctx.fillText(txt, 0, 0)

      // 恢复坐标原点和旋转角度
      ctx.rotate(-deg * Math.PI / 180)
      ctx.translate(-x, -y)
    },
    //绘制背景线条
    drawLine(ctx){
      for (let i = 0; i < 20; i++) {
        let x = this.randomNum(0, this.contentWidth);
        let y = this.randomNum(0, this.contentHeight);
        ctx.strokeStyle = this.randomColor(this.lineColorMin, this.lineColorMax)
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + this.randomNum(0,this.contentWidth/2), y + this.randomNum(0,this.contentHeight/2));
        ctx.stroke();
      }
    },
    //绘制背景圆点
    drawDot(ctx){
      ctx.fillStyle = this.randomColor(0, 255)
          ctx.beginPath();
          ctx.arc(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight),1,0,2 * Math.PI);
          ctx.fill();
    },
    //绘制整个图片随机码
    drawPic(){
      let canvas=document.getElementById('qrcanvas');
      let ctx = canvas.getContext('2d');
      ctx.textBaseline = 'bottom'

      //绘制背景
      ctx.fillStyle = this.randomColor(this.backgroundColorMin, this.backgroundColorMax);
      ctx.fillRect(0,0,this.contentWidth, this.contentHeight);
      //绘制文字
      for(let j=0;j<=3;j++){
        let index = Math.floor(Math.random()*60);
        this.drawText(ctx, this.imgCode[index], j)
      }
      //绘制线条
      this.drawLine(ctx)
      //绘制圆点
      this.drawDot(ctx)
    },

    //刷新整个页面
    refreshCode(){
      console.log('强制刷新')
      this.drawPic()
    }
  },

  watch: {
    imgCode () {
        this.drawPic()
      }
  },
  mounted () {
     this.drawPic()
  },

  computed: {},

  components: {},
}

</script>
<style scoped>

</style>
