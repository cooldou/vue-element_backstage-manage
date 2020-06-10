<template>
  <el-dialog
    :visible.sync="visible"
    :append-to-body="true"
    custom-class="image-show-dialog"
    @close="clear"
  >
    <img width="100%" :src="imageUrl">
  </el-dialog>
</template>

<script>

  export default {
    name: 'ImageShowDialog',

    components: {

    },

    props: {

    },

    data: () => ({
      visible: false,
      imageUrl: ''
    }),

    methods: {
      show (imageUrl) {
        this.visible = true
        this.imageUrl = imageUrl
      },

      clear () {
        this.visible = false
        this.imageUrl = ''
      }
    }
  }
</script>

<style lang="scss">
  .image-show-dialog {
    width: 800px;
    .el-dialog__headerbtn {
      top: 4px !important;
    }
    img {
      width: 100%;
      height: auto;
    }
  }
</style>
