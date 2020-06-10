<template>
  <el-form-item :label="label"
    :prop="name"
    :required="required">
    <el-radio-group v-model="selected"
      :disabled="disabled || readonly"
      @change="$emit('input', $event)">
      <el-radio v-for="item in collection"
        :key="item.value"
        :label="item.value">
        {{ item.label }}
      </el-radio>
    </el-radio-group>
  </el-form-item>
</template>

<script>
import inputMixin from '@/mixins/input-mixin'

export default {
  name: 'RadioInput',

  mixins: [inputMixin],

  props: {
    collection: {
      type: Array,
      default() { return [] }
    }
  },

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
