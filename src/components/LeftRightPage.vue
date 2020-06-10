<template>
  <div class="left-right-page-container">
    <div class="left-right-page-card">
      <slot name="header"></slot>

      <div class="page-content-container">

        <div class="search-data-container" v-if="leftShow" :class="{'split-line': splitLine}"
          :style=" rightFixed ? {width: `calc(100% - ${rightWidth})`} : {'width': leftWidth, 'min-width': leftMinWidth}">
          <slot name="leftData">
          </slot>
        </div>

        <div class="page-content-data" :style="rightFixed ? {width: rightWidth} : leftShow ? {width: `calc(100% - ${leftWidth})`} : {width: '100%'}">
          <slot name="rightData">
          </slot>
          <div class="left-right-page-bottom-bar" v-if="showBottomBar">
            <el-pagination
              background
              layout="prev, pager, next, sizes, total"
              :pager-count="pagerCount"
              :total="total"
              :page-size="pageSize"
              :current-page="currentPage"
              @size-change="$emit('page-size-change', $event)"
              @current-change="$emit('page-change', $event)"
              @prev-click="$emit('page-change', $event)"
              @next-click="$emit('page-change', $event)"
            ></el-pagination>
          </div>
        </div>

      </div>
      <div class="page-footer-container" v-if="footerShow">
        <slot name="footerData"></slot>
      </div>
      <slot name="position"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LeftRightPage',

    components: {
    },

    props: {
      leftShow: {
        type: Boolean,
        default: true
      },
      footerShow: {
        type: Boolean,
        default: false
      },
      leftWidth: {
        type: String,
        default: '30%'
      },
      rightWidth: {
        type: String,
        default: '50%'
      },
      leftMinWidth: {
        type: String,
        default: '0'
      },

      rightFixed: {
        type: Boolean,
        default: false
      },

      pagerCount: {
        type: Number,
        default: 7
      },

      total: {
        type: Number,
        default: 0
      },

      pageSize: {
        type: Number,
        default: 20
      },

      currentPage: {
        type: Number,
        default: 1
      },

      showBottomBar: {
        type: Boolean,
        default: false
      },

      splitLine: {
        type: Boolean,
        default: true
      }
    }
  }
</script>
<style lang="scss" scoped>
  .left-right-page-container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    .left-right-page-card {
      position: relative;
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
    }
    .page-content-container {
      /*height: 100%;*/
      flex: 1;
      min-height: 1px;
      display: flex;
      width: 100%;
      box-sizing: border-box;

      .search-data-container {
        overflow: hidden;
        overflow-y: auto;
        overflow-x: auto;
        box-sizing: border-box;
        height: 100%;
        display: flex;
        flex-direction: column;
        &.split-line {
          border-right: 1px solid #ebeef5;
        }
      }
      .page-content-data {
        height: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        /*background-color: #F0F0F0;*/
        background-color: #f6f7fb;
      }
    }

    .page-footer-container {
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 0 20px;
      border-top: 1px solid #ebeef5;
      height: 26px;
      align-items: center;
      font-size: 14px;
      width: 100%;
      >:nth-child(1) {
        span {
          margin-right: 20px;
        }
      }
      >:nth-child(2) {
        color: #409EFF;
        cursor: pointer;
      }
    }
  }
  .left-right-page-bottom-bar {
    border-top: 1px solid #ebeef5;
    box-sizing: border-box;
    text-align: right;
    .el-pagination {
      padding: 5px;
    }
  }
</style>
