<template>
  <div>
    <el-upload
      class="upload-img-uploader"
      :action="uploadURL"
      :headers="headers"
      accept="image/*"
      list-type="picture-card"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-remove="handleRemove"
      :before-upload="beforeUpload"
      :multiple="multiple"
      :show-file-list="multiple"
      :file-list="fileList">
      <img v-if="!multiple && imgUrl" :src="imgUrl" class="avatar">
      <i class="el-icon-plus avatar-uploader-icon" v-else></i>
    </el-upload>
  </div>
</template>

<script>
  import { getUploadURL } from '@/modules/utils'
  import { getSession } from '@/modules/authentication'
  import _ from 'lodash'

  export default {
    name: 'uploadImg',

    props: {
      multiple: {
        type: Boolean,
        default: false
      },
      avatar: {
        type: String,
        default: ''
      },
      filedir: {
        type: String,
        default: 'shuangkong'
      }
    },

    data() {
      return {
        fileList: [],
        imgUrl: ''
      }
    },

    created () {
      if (this.avatar) {
        if (!this.multiple) {
          this.imgUrl = this.avatar
        } else {
          this.fileList = []
          _.each(this.avatar.split(';'), (i) => {
            this.fileList.push({
              name: i,
              url: i
            })
          })
        }
      }
    },

    watch: {
      avatar(v) {
        if (!this.multiple) {
          this.imgUrl = v
        } else {
          this.fileList = []
          if (v && v.split(';').length) {
            _.each(v.split(';'), (i) => {
              this.fileList.push({
                name: i,
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
        if (getSession()) {
          return {
            'Authorization': getSession().token
          }
        }
        return {
          'Authorization': null
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
          this.imgUrl = res.data
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
  .upload-img-uploader {
    .el-upload-list--picture-card {
      .el-upload-list__item {
        width: 120px;
        height: 120px;
        margin: 0px 8px 8px 0;
      }
    }
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      width: 120px;
      height: 120px;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader-icon {
      font-size: 40px;
      color: #8c939d;
      width: 118px;
      height: 118px;
      line-height: 120px;
      position: absolute;
      top: 0;
      left: 0;
    }
    .avatar {
      width: 120px;
      height: 120px;
      display: block;
    }
    .el-upload-list__item {
      max-width: 300px;
    }
  }
</style>
