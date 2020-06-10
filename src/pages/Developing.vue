<template>
  <div class="page developing-container">
    <div>
      <img src="static/img/developing.png" v-if="imgWidth" :width="imgWidth">
      <img src="static/img/developing.png" v-else>
      <div>{{content}}</div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Developing',

    props: {
      content: {
        type: String,
        default: '功能开发中，敬请期待…'
      },

      imgWidth: {
        type: String,
        default: ''
      }
    }
  }
</script>
<style lang="scss" scoped>
  .developing-container {
    display: flex;
    justify-content: center;
    align-items: center;
    >div {
      display: flex;
      flex-direction: column;
      >div {
        text-align: center;
        font-size: 18px;
        font-weight: 900;
        color: #304053;
        margin-top: 20px;
      }
    }
  }
</style>

