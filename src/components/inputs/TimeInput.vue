<template>
  <el-form-item :label="label"
    :prop="name"
    :required="required">
    <el-time-select
      :editable="false"
      :placeholder="placeholder"
      :disabled="disabled"
      :picker-options="{
        start: '00:00',
        step: '00:01',
        end: '23:59'
      }"
      :readonly="readonly"
      v-model="selected"
      @change="$emit('input', $event)">
    </el-time-select>
  </el-form-item>
</template>

<script>
import inputMixin from '@/mixins/input-mixin'

export default {
  name: 'TimeInput',

  mixins: [inputMixin],

  data() {
    return {
      selected: this.value
    }
  },

  watch: {
    value(val) {
      this.selected = val
    }
  }
}
</script>
