<template>
  <el-form :model="formData"
    :label-width="labelWidth"
    label-suffix="："
    ref="form"
    :rules="formRules"
    :size="size"
    :disabled="disabled"
    :style="`width: ${formWidth}`">
    <template v-for="(item, index) in formSchema">
      <el-row :key="index"
        v-if="item.fieldset && item.inputs.length">
        <div class="legend">{{item.legend}}</div>
        <div class="tip-content" v-if="item.tip && editRisk">{{item.tip}}</div>
        <el-col v-for="(input, inputIndex) in item.inputs"
          :key="input.name"
          :span="inputIndex === item.inputs.length - 1 && inputIndex % 2 === 0 ? 24 : 12">
          <component :is="`${input.inputType}-input`"
            :value="formData[input.name]"
            v-bind="input"
            ref='input.name'
            @input="handleInput(input.name, $event)">
          </component>
        </el-col>
      </el-row>

      <component v-else
        :key="item.name"
        :is="`${item.inputType}-input`"
        :value="formData[item.name]"
        v-bind="item"
        @input="handleInput(item.name, $event)">
      </component>
    </template>
  </el-form>
</template>

<script>
  import isArray from 'lodash/isArray'
  import flatMap from 'lodash/flatMap'

  export default {
    name: 'SimpleForm',

    props: {
      formSchema: {
        type: Array,
        default() { return [] }
      },

      formRules: {
        type: Object,
        default() { return {} }
      },

      labelWidth: {
        type: String,
        default: '80px'
      },
      formWidth: {
        type: String,
        default: '500px'
      },
      size: {
        type: String,
        default: 'medium'
      },
      disabled: {
        type: Boolean,
        default: false
      },
      editRisk: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        formData: {}
      }
    },

    methods: {
      isArray(schema) {
        return isArray(schema)
      },

      handleInput(name, value) {
        this.formData[name] = value
      },

      async submit() {
        try {
          const valid = await this.$refs.form.validate()
          if (valid) {
            this.$emit('submit', this.formData)
          }
        } catch (error) {
        }
      },

      reset() {
        this.$refs.form.resetFields()
        for (const key in this.formData) {
          this.formData[key] = null;
        }
      },

      syncFormData() {
        flatMap(this.formSchema, item => {
          if (item.fieldset && item.inputs.length) {
            return item.inputs
          } else {
            return [item]
          }
        }).forEach(input => {
          this.$set(this.formData, input.name, input.value)
        })
      },

      //编辑传单条数据
      changeFormData(data) {
        this.formData = data
      }
    },

    created() {
      this.syncFormData()
    },

    watch: {
      formSchema(formSchema) {
        this.syncFormData()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .legend {
    font-size: 16px;
    color: #333;
    margin: 0 0 19px;
  }
  .tip-content {
    text-align: center;
    margin-top: -38px;
    margin-bottom: 20px;
    color: #F56C6C;
    font-size: 12px;
  }
</style>

