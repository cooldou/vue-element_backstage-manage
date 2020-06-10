<template>
  <el-form-item :label="label"
    :prop="name"
    :required="required">
    <el-input type="number"
      :value="value"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      @change="$emit('input', $event)">
      <template slot="append" v-if="!!suffix">{{suffix}}</template>
    </el-input>
  </el-form-item>
</template>

<script>
import inputMixin from '@/mixins/input-mixin'

export default {
  name: 'NumberInput',

  mixins: [inputMixin],

  props: {
    suffix: String
  }
}
</script>
