<template>
  <form-dialog :visible.sync="visible"
    title="修改密码"
    @close="handleDialogClose"
    @submit="handleDialogSubmit">
    <simple-form label-width="100px"
      :form-schema="formSchema"
      :form-rules="formRules"
      ref="form"
      @submit="submitForm"
      v-loading="loading">
    </simple-form>
  </form-dialog>
</template>

<script>
import clone from 'lodash/clone'
import { mapState, mapActions } from 'vuex'
import FormDialog from '@/components/FormDialog'
import SimpleForm from '@/components/SimpleForm'
import { clearSession } from '@/modules/authentication'

const formSchema = [
  { name: 'oldPassword', label: '旧密码', inputType: 'password' },
  { name: 'newPassword', label: '新密码', inputType: 'password', placeholder: '6～13位字母、数字、字符' },
  { name: 'confirmPassword', label: '确认密码', inputType: 'password', placeholder: '请再次输入新密码' }
]

const formRules = {
  oldPassword: { required: true, message: '请填写旧密码', trigger: 'blur' },
  newPassword: [
    { required: true, message: '请填写新密码', trigger: 'blur' },
    { min: 6, message: '密码不能少于6位', trigger: 'blur' }
  ]
}

export default {
  name: 'ChangePasswordForm',

  components: {
    FormDialog,
    SimpleForm
  },

  data() {
    const confirmPasswordValidator = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.$refs.form.formData.newPassword) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }

    return {
      visible: false,
      loading: false,
      formSchema,
      formRules: Object.assign({
        confirmPassword: { validator: confirmPasswordValidator, trigger: 'blur' }
      }, formRules)
    }
  },

  computed: {
    // ...mapState('account', { account: 'model' })
  },

  methods: {
    ...mapActions('account', ['updatePassword']),

    show () {
      this.visible = true
    },

    handleDialogClose() {
      this.$refs.form.reset()
      this.formSchema = formSchema.map(clone)
    },

    handleDialogSubmit() {
      this.$refs.form.submit()
    },

    async submitForm(formData) {
      if (this.loading) return

      this.loading = true

      const result = await this.updatePassword(formData)

      if (!result.status) {
        this.visible = false
        this.message('修改成功', 'success')
        clearSession()
        this.$router.replace({ name: 'signin' })
      } else {
        this.message(result.msg, 'error')
      }
    },

    message (msg, type) {
      this.loading = false
      this.$message({
        message: msg,
        type: type
      })
    }
  }
}
</script>
