<template>
  <el-form-item :label="label"
    :prop="name"
    :required="required">
    <el-switch :name="name"
      v-model="checked"
      :disabled="disabled || readonly"
      :active-value="1"
      :inactive-value="0"
      @change="$emit('input', $event)">
    </el-switch>
  </el-form-item>
</template>

<script>
import inputMixin from '@/mixins/input-mixin'

export default {
  name: 'BooleanInput',

  mixins: [inputMixin],

  data() {
    return {
      checked: this.value
    }
  }
}
</script>
