<template>
  <div class="editor-container">
    <textarea name="content" id="editor" v-model="t"></textarea>
  </div>
</template>
<style>

</style>
<script>
  import InitEditor from 'MIXIN/editor'

  export default {
    mixins: [InitEditor],
    props: ['d'],
    computed: {
      t () {
        return this.d || ''
      }
    },

    mounted () {
      setTimeout(() => {
        this.editor('editor')
        CKEDITOR.instances.editor.on('change', () => {
          this.handleChange(CKEDITOR.instances.editor.getData())
        })
      }, 100)
    },

    methods: {
      handleChange (t) {
        this.$emit('handleChange', t)
      }
    }
  }
</script>
