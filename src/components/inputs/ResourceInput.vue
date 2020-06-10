<template>
  <el-form-item :label="label"
    :prop="name"
    :required="required">
    <el-select v-model="selected"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :clearable="true"
      :allow-create="allowCreate"
      :filterable="allowCreate"
      :default-first-option="true"
      @change="handleChange">
      <el-option v-for="item in collection"
        :key="item.value"
        :label="item.label"
        :value="item">
      </el-option>
    </el-select>
  </el-form-item>
</template>

<script>
import isPlainObject from 'lodash/isPlainObject'
import { mapState, mapActions } from 'vuex'
import inputMixin from '@/mixins/input-mixin'

export default {
  name: 'ResourceInput',

  mixins: [inputMixin],

  props: {
    valueProp: {
      type: String,
      default: 'label'
    },

    resourceName: {
      type: String,
      required: true
    },

    multiple: {
      type: Boolean,
      default: false
    },

    allowCreate: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      selected: {}
    }
  },

  computed: {
    ...mapState('resourceSelect', ['stores']),

    collection() {
      return this.stores[this.resourceName] || []
    }
  },

  methods: {
    ...mapActions('resourceSelect', ['loadResources']),

    handleChange(selected) {
      this.dirty = true

      if (isPlainObject(selected)) {
        this.$emit('input', selected ? selected[this.valueProp] : '')
      } else {
        this.$emit('input', selected)
      }

      this.$nextTick(() => this.dirty = false)
    }
  },

  async created() {
    await this.loadResources(this.resourceName)
    if (this.value) {
      this.selected = this.collection.find(item => {
        return item[this.valueProp] === this.value
      })
    }
  },

  watch: {
    value(val) {
      if (this.dirty) return

      if (val) {
        this.selected = this.collection.find(item => {
          return item[this.valueProp] === val
        })
      } else {
        this.selected = {}
      }
    }
  }
}
</script>
