<template>
  <div class="dashboard-item-module-content">
    <div class="module-title" v-if="isTitle">
      <slot name="title"></slot>
    </div>
    <div class="module-content">
      <slot></slot>
    </div>
    <div v-if="isFooter">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DashboardItemModule',

    components: {
    },

    props: {
      isFooter: {
        type: Boolean,
        default: false
      },
      isTitle: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .dashboard-item-module-content {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-color: white;
    display: flex;
    flex-direction: column;
    .module-title {
      box-sizing: border-box;
      width: 100%;
      padding: 10px 0;
      border-bottom: 1px solid #eee;
      /*font-size: 14px;*/
      /*font-weight: 500;*/
      /*color: #333;*/
      font-family: '微软雅黑';
      font-size: 16px;
      font-weight: bold;
      color: #666;
      position: relative;
      .title-border-left {
        border-left: 4px solid cornflowerblue;
        padding-left: 10px;
        box-sizing: border-box;
      }
    }
    .module-content {
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      /*height: 100%;*/
      flex: 1;
      min-height: 1px;
    }
    .module-footer {
      width: 100%;
      box-sizing: border-box;
    }
  }
</style>
