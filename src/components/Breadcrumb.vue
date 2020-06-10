<template>
  <div class="breadcrumb-wrapper">
    <el-breadcrumb class="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in items"
        :key="index">
        <router-link v-if="item.route"
          :to="item.route"
          :replace="!!item.replace">
          {{item.name}}
        </router-link>
        <template v-else>{{item.name}}</template>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',

  props: {
    items: {
      type: Array,
      default() { return [] }
    }
  }
}
</script>

<style lang="scss" scoped>
.breadcrumb-wrapper {
  height: 40px;
  background: #ffffff;
  box-shadow: 0px 1px 3px 0px rgba(4,26,55,0.08);
  padding: 0 20px;
  z-index: 1;
  position: relative;

  .breadcrumb {
    line-height: 40px;
  }
}
</style>

