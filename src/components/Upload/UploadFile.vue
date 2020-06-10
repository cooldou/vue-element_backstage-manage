<template>
  <div>
    <el-upload
      class="upload-file-uploader"
      :action="uploadURL"
      accept=""
      :headers="headers"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-remove="handleRemove"
      :before-upload="beforeUpload"
      :multiple="multiple"
      show-file-list
      :file-list="fileList">
      <el-button type="primary" size="small">点击上传</el-button>
    </el-upload>
  </div>
</template>
<script>
  import { getUploadURL } from '@/modules/utils'
  import { getSession } from '@/modules/authentication'
  import _ from 'lodash'

  export default {
    name: 'uploadFile',

    props: {
      multiple: {
        type: Boolean,
        default: true
      },
      avatar: '',
      filedir: {
        type: String,
        default: 'shuangkong'
      }
    },

    data() {
      return {
        fileList: []
      }
    },

    created () {
      if (this.avatar) {
        this.fileList = []
        if (!this.multiple) {
          this.fileList.push({
            name: decodeURIComponent(this.avatar.slice(this.avatar.lastIndexOf('/') + 1)),
            url: this.avatar
          })
        } else {
          _.each(this.avatar.split(';'), (i) => {
            this.fileList.push({
              name: decodeURIComponent(i.slice(i.lastIndexOf('/') + 1)),
              url: i
            })
          })
        }
      }
    },

    watch: {
      avatar(v) {
        this.fileList = []
        if (!this.multiple && v) {
          this.fileList.push({
            name: decodeURIComponent(v.slice(v.lastIndexOf('/') + 1)),
            url: v
          })
        } else {
          if (v && v.split(';').length) {
            _.each(v.split(';'), (i) => {
              this.fileList.push({
                name: decodeURIComponent(i.slice(i.lastIndexOf('/') + 1)),
                url: i
              })
            })
          }
        }
      }
    },

    computed: {
      uploadURL () {
        return getUploadURL() + `?filedir=${this.filedir}`
      },

      headers () {
        return {
          'Authorization': getSession().token
        }
      }
    },

    methods: {
      handleSuccess (res, file, fileList) {
        if (this.multiple) {
          this.fileList = []
          _.each(fileList, (i) => {
            this.fileList.push({
              name: i.name,
              url: i.response ? i.response.data : i.url
            })
          })
          this.$emit('handleSuccess', _.map(this.fileList, 'url').join(';'))
        } else {
          this.fileList = []
          this.fileList.push({
            name: file.name,
            url: file.response ? file.response.data : file.url
          })
          this.$emit('handleSuccess', res.data)
        }
      },

      handleError (err, file, fileList) {
      },

      handleRemove (file, fileList) {
        this.$emit('handleSuccess', _.map(fileList, 'url').join(';'))
      },

      beforeUpload (file) {
        return true
      }
    }
  }
</script>
<style lang="scss">
  .upload-file-uploader {
  }
</style>
