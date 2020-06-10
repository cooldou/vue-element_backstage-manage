<template>
  <div class="page-card page-card-deep el-card is-never-shadow" :class="{'margin-left': marginLeft}">
    <div class="card-header">
      <slot name="header"></slot>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>

    <div class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PageCard',
    props: {
      marginLeft: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .page-card {
    margin: 20px 0px 0;
    height: calc(100% - 20px);
    display: flex;
    flex-direction: column;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    .card-body {
      flex: 1;
      min-height: 200px;
    }
    &.margin-left {
      margin-left: 20px;
    }
  }
</style>
<style lang="scss">
  .page-card-deep {
    .card-body {
      .data-table {
        height: 100%;
      }
    }
  }
</style>
