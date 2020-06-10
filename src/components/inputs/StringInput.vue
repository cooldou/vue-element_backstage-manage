<template>
  <el-form-item :label="label"
    :prop="name"
    :required="required">
    <el-input type="text"
      v-model="stingValue"
      :value="value"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      @change="$emit('input', $event)">
    </el-input>
  </el-form-item>
</template>

<script>
  import inputMixin from '@/mixins/input-mixin'

  export default {
    name: 'StringInput',

    mixins: [inputMixin],
    data() {
      return {
        stingValue: ''
      }
    },
    created () {
      this.stingValue = this.value
    },
    watch: {
      value (v) {
        this.stingValue = v
      }
    }
  }
</script>
