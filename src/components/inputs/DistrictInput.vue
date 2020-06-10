<template>
  <el-form-item :label="label"
    :prop="name"
    :required="required">
    <el-cascader
      :options="items"
      :props="defaultProps"
      :placeholder="placeholder"
      :disabled="disabled || readonly"
      v-model="selectedItems"
      :change-on-select="selectAny"
      :clearable="true"
      @change="handleChange">
    </el-cascader>
  </el-form-item>
</template>

<script>
import difference from 'lodash/difference'
import min from 'lodash/min'
import isString from 'lodash/isString'
import { mapState, mapMutations, mapActions } from 'vuex'
import inputMixin from '@/mixins/input-mixin'

export default {
  name: 'DistrictInput',

  props: {
    placeholder: {
      type: String,
      default: '请选择'
    },

    valueProp: {
      type: String,
      default: 'id'
    },

    selectAny: {
      type: Boolean,
      default: false
    }
  },

  mixins: [inputMixin],

  data() {
    return {
      defaultProps: {
        value: 'id',
        label: 'label',
        children: 'children',
        disabled: 'disabled'
      },

      selectedItems: []
    }
  },

  computed: {
    // ...mapState('district', ['items', 'flattedItems'])
  },

  methods: {
    // ...mapActions('district', ['loadItems']),

    handleChange(selected) {
      if (selected && selected.length > 0) {
        this.$emit('input', this.getSelectedValue(selected))
      } else {
        this.$emit('input')
      }
    },

    getSelectedValue(selected) {
      const selectedId = selected.slice(-1)[0]
      const selectedItem = this.flattedItems.find(item => item.id === selectedId)

      switch (this.valueProp) {
      case 'code':
        return selectedItem.value
      case 'path':
        selected.map(itemId => {
          return this.flattedItems.find(item => item.id === itemId).id
        }).join(',')
      default:
        return selectedItem.id
      }
    },

    setSelectedItems(value) {
      let valueProp = this.valueProp === 'code' ? 'value' : 'id'
      const selectedItems = []
      const selectedItem = this.flattedItems.find(item => item[valueProp] === value)

      if (selectedItem) {
        selectedItems.push(selectedItem.id)

        const parent = this.flattedItems.find(item => item.id === selectedItem.parentId)
        if (parent) {
          selectedItems.unshift(parent.id)
          if (parent.parentId) selectedItems.unshift(parent.parentId)
        }
      }

      this.selectedItems = selectedItems
    }
  },

  async created() {
    await this.loadItems()
    if (this.value) this.setSelectedItems(this.value)
  },

  watch: {
    async value(newVal) {
      if (!newVal) {
        this.selectedItems = []
      } else {
        this.setSelectedItems(newVal)
      }
    }
  }
}
</script>
