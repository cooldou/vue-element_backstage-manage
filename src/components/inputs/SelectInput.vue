<template>
  <el-form-item :label="label"
    :prop="name"
    :required="required">
    <el-select v-model="selected"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :clearable="true"
      @change="$emit('input', $event)">
      <el-option v-for="item in collection"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </el-form-item>
</template>

<script>
import inputMixin from '@/mixins/input-mixin'

export default {
  name: 'SelectInput',

  mixins: [inputMixin],

  props: {
    collection: {
      type: Array,
      default() { return [] }
    },

    multiple: {
      type: Boolean,
      default: false
    },
    bindId: {
      type: Boolean,
      default: false
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
