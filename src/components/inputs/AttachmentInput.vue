<template>
  <el-form-item :label="label"
    :prop="name"
    :required="required">
    <el-upload :action="uploadURL"
      :file-list="fileList"
      :disabled="disabled || readonly"
      :multiple="multiple"
      :list-type="listType"
      :accept="image ? 'image/*' : accept"
      :data="extraData"
      :before-upload="handleBeforeUpload"
      :on-success="handleSuccess"
      :on-remove="handleRemove"
      :on-preview="handlePreview">
      <el-button size="medium" type="primary" :loading="uploading">点击上传</el-button>
    </el-upload>

    <el-dialog :visible.sync="previewDialogVisible"
      :append-to-body="true"
      custom-class="photo-preview-dialog">
      <img width="100%" :src="imageURL">
    </el-dialog>
  </el-form-item>
</template>

<script>
import isImage from 'is-image'
import inputMixin from '@/mixins/input-mixin'
import { getUploadURL } from '@/modules/utils'

export default {
  name: 'AttachmentInput',

  mixins: [inputMixin],

  props: {
    multiple: {
      type: Boolean,
      default: true
    },

    image: {
      type: Boolean,
      default: false
    },

    accept: String,

    filedir: {
      type: String,
      default: 'attachment'
    }
  },

  data() {
    return {
      uploading: false,
      fileList: [],

      previewDialogVisible: false,
      imageURL: ''
    }
  },

  computed: {
    listType() {
      return this.image ? 'picture' : 'text'
    },

    uploadURL() {
      return getUploadURL()
    },

    extraData() {
      return { filedir: this.filedir }
    }
  },

  methods: {
    handleBeforeUpload(file) {
      if (this.image && !isImage(file.name)) {
        this.$alert('请上传图片类型的文件', '错误提示', { type: 'warning' })
        return false
      }

      this.uploading = true
    },

    handleSuccess(response, file, fileList) {
      this.fileList = fileList.slice(0).filter(file => {
        return file.response && file.response.status === 0
      }).map(file => {
        return Object.assign({}, file, {
          url: file.response.data
        })
      })

      this.$emit('input', this.fileList.map(file => file.url).join(','))
      this.uploading = false
    },

    handleRemove(file, fileList) {
      this.fileList = fileList.slice(0)
      this.$emit('input', this.fileList.map(file => file.url).join(','))
    },

    handlePreview(file) {
      if (isImage(file.url)) {
        this.imageURL = file.url
        this.previewDialogVisible = true
      }
    }
  },

  mounted() {
    if (this.value) {
      this.fileList = this.value.split(',').map(fileURL => {
        return {
          name: fileURL.replace(/^.*[\\\/]/, ''),
          url: fileURL
        }
      })
    }
  },

  watch: {
    value(val, oldVal) {
      if (this.uploading) return

      if (val) {
        this.fileList = val.split(',').map(fileURL => {
          return {
            name: decodeURIComponent(fileURL.replace(/^.*[\\\/]/, '')),
            url: fileURL
          }
        })
      } else {
        this.fileList = []
      }
    }
  }
}
</script>
