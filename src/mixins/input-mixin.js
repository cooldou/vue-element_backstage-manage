export default {
  props: {
    id: String,
    name: String,
    label: String,
    placeholder: String,
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      defualt: false
    },
    readonly: {
      type: Boolean,
      defualt: false
    },
    value: null
  }
}