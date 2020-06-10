<template>
  <div class="page">
    <div class="dashboard-container">
      <div class="content-text">
        <!-- <img src="static/img/logo.png" alt=""> <br> -->
        <span class="title-span">欢迎您使用XXXX后台管理系统</span> <br>
        <span class="sub-title-span">今天是 {{timeNow}}</span><br>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .dashboard-container{
    background: white;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .content-text{
      text-align: center;
      line-height: 30px;
      .title-span{
        color: #e3b784;
        text-shadow: 1px 1px 4px #e3b784;
        font-size: 24px;
      }
      .sub-title-span{
        color: #BFBFBF;
        font-size: 14px;
      }
    }
  }
</style>

<script>
  import dayjs from 'dayjs'
  export default {
    name: 'Dashboard',

    components: {  },

    computed: {
      timeNow () {
        return dayjs().format('YYYY年MM月DD日') + ' ' + this.day()
      }
    },

    methods: {
      day() {
        let day = dayjs().day()
        let str = '星期'
        switch (day) {
          case 1:
            return str + '一'
          case 2:
            return str + '二'
          case 3:
            return str + '三'
          case 4:
            return str + '四'
          case 5:
            return str + '五'
          case 6:
            return str + '六'
          default:
            return str + '天'
        }
      }
    }
  }
</script>
