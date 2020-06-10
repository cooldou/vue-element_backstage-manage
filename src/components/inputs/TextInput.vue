<template>
  <el-form-item :label="label"
    :prop="name"
    :required="required">
    <el-input type="textarea"
      v-model="stingValue"
      :value="value"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :rows="rows"
      @change="$emit('input', $event)">
    </el-input>
  </el-form-item>
</template>

<script>
  import inputMixin from '@/mixins/input-mixin'

  export default {
    name: 'TextInput',

    mixins: [inputMixin],

    props: {
      rows: {
        type: Number,
        default: 3
      }
    },
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
