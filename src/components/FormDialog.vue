<template>
  <el-dialog :visible.sync="show"
    :title="title"
    :width="width"
    :fullscreen="fullscreen"
    :modal="modal"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :append-to-body="appendToBody"
    @open="$emit('open')"
    @close="$emit('close')"
    @closed="$emit('closed')"
    ref="dialog"
    class="form-dialog">

    <slot></slot>

    <template slot="footer" v-if="showButtons">
      <div class="form-buttons">
        <el-button type="primary" @click="$emit('submit')">确定</el-button>
        <el-button @click="show = false">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: 'FormDialog',

  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: String,
    width: {
      type: String,
      default: '800px'
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    modal: {
      type: Boolean,
      default: true
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    showButtons: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      show: null
    }
  },

  watch: {
    visible(val) {
      this.show = val
    },

    show(val, oldVal) {
      if (oldVal !== null && val !== oldVal) {
        this.$emit('update:visible', val)
      }
    }
  }
}
</script>
