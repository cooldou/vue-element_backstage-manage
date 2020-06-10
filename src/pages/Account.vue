<template>
  <div class="page">
    <breadcrumb :items="[{ name: '个人设置' }]"></breadcrumb>

    <div class="page-main">
      <page-card>
        <el-row class="user-system-form">
          <el-col :span="6">
            <div class="form-field-value">
              <div class="label">账号</div>
              <div class="value">账号</div>
            </div>

            <div class="form-field-value">
              <div class="label">手机号</div>
              <div class="value">手机号</div>
            </div>

            <div class="form-field-value">
              <div class="label">密码</div>
              <div class="value password">
                ********
                <el-button type="primary" size="mini" @click="changePasswordForm.show()">修改</el-button>
              </div>
            </div>
          </el-col>

          <el-col :span="18">
            <div class="form-field-value">
              <div class="label">昵称</div>
              <div class="value">{{userInfo.nickname}}</div>
            </div>

            <div class="form-field-value">
              <div class="label">邮箱</div>
              <div class="value">{{userInfo.email}}</div>
            </div>
          </el-col>
        </el-row>
      </page-card>
    </div>

    <change-password-form ref="changePasswordForm"></change-password-form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import PageCard from "@/components/PageCard";
import ChangePasswordForm from "./ChangePasswordForm";
import { getSession } from "@/modules/authentication";

export default {
  name: "Account",

  components: {
    Breadcrumb,
    PageCard,
    ChangePasswordForm
  },

  data() {
    return {
      user: {}
    };
  },

  computed: {
    // ...mapState('account', ['model']),

    changePasswordForm() {
      return this.$refs.changePasswordForm;
    },

    userInfo() {
      // return getSession().user;
      return {};
    }
  },

  methods: {
    // ...mapActions('account', ['loadData'])
  },

  created() {
    // this.loadData()
  }
};
</script>

<style lang="scss" scoped>
.user-system-form {
  box-sizing: border-box;
  padding: 20px;
}
.form-field-value {
  margin-bottom: 30px;
  font-size: 14px;

  .label {
    color: #999;
    width: 80px;
    display: inline-block;
    margin-bottom: 10px;
  }

  .value {
    color: #333;
  }

  .password {
    display: flex;
    align-items: center;

    .el-button {
      margin-left: 24px;
    }
  }
}
</style>
