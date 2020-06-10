<template>
  <div class="file-show-container">
    <iframe v-if="url && fileType === 'pdf'" :src="url"></iframe>
    <iframe v-if="url && fileType === 'file'"
      :src="`https://view.officeapps.live.com/op/view.aspx?src=${url}`">
    </iframe>
    <img v-if="url && fileType === 'img'"
      :src="url" style="width: 100%;">
    </img>
  </div>
</template>
<script>
  export default {
    name: 'FileShow',
    props: {
      url: {
        type: String,
        default: ''
      }
    },

    computed: {
      fileType () {
        return this.url.lastIndexOf('.pdf') > -1 || this.url.lastIndexOf('.PDF') > -1 ? 'pdf'
        : this.url.lastIndexOf('.jpg') > -1 || this.url.lastIndexOf('.png') > -1 || this.url.lastIndexOf('.jpeg') > -1? 'img' : 'file'
      }
    }
  }
</script>
<style lang="scss">
  .file-show-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
    iframe {
      width: 100%;
      height: 100%;
      border: 0;
    }
  }
</style>
