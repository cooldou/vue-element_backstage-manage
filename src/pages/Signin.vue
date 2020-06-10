<template>
  <el-container class="enterprise-signin-page" style="background-image: url('static/img/login/login.png');">
    <el-main class="main">
      <div class="enterprise-signin-page-content-container">
        <div class="page-title">
          <!-- <div class="logo">
          <img src="@/assets/images/logo.png">
          </div>-->
          <div class="name">XXX后台管理系统</div>
        </div>

        <div class="signin-form-container">
          <div class="title">
            <div>
              <img src="@/assets/icons/new-login-icon.png" alt />
            </div>
            <div>登录</div>
          </div>
          <el-form class="signin-form" :model="form" :rules="formRules" :inline-message="true" ref="signinForm">
            <div class="account-input">
              <el-form-item prop="account">
                <el-input placeholder="请输入账号" id="accountNumber" v-model="form.account">
                  <template slot="prepend">
                    <img src="@/assets/icons/user.png" class="account-input-prefix" />
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input placeholder="请输入密码" v-model="form.password" type="password" @keyup.enter.native="makeLogin">
                  <template slot="prepend">
                    <img src="@/assets/icons/secret.png" class="password-input-prefix" />
                  </template>
                </el-input>
              </el-form-item>
              <el-checkbox style="margin-left:65px;color:#666;" v-model="form.remember">记住密码</el-checkbox>
            </div>

            <el-form-item class="login-button-wrapper">
              <div>
                <el-button type="primary" :loading="submiting" class="login-button" @click.stop.prevent="makeLogin">登录</el-button>
              </div>
            </el-form-item>
          </el-form>

          <div class="left-top"></div>
          <div class="right-top"></div>
          <div class="left-bottom"></div>
          <div class="right-bottom"></div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>

  import { mapState, mapActions, mapMutations } from 'vuex'
  import storage from '@/modules/storage'
  import { signIn, updateSession, getSession } from '@/modules/authentication'

  export default {
    name: 'Signin',

    data () {
      const rememberedAccount = storage.get('management-remembered-account')

      return {
        loading: true,
        setting: {
          backgroundImg: 'static/img/login/login.png'
        },

        submiting: false,

        form: {
          account: rememberedAccount ? rememberedAccount.account : null,
          password: rememberedAccount ? rememberedAccount.password : null,
          remember: !!rememberedAccount
        },

        formRules: {
          account: { required: true, message: '请输入账号', trigger: 'blur' },
          password: { required: true, message: '请输入密码', trigger: 'blur' }
        }
      }
    },

    computed: {
      ...mapState('account', { user: 'model' })
    },

    methods: {
      ...mapActions('account', { loadAccount: 'loadData', getConfigPath: 'getConfigPath' }),

      async makeLogin () {
        try {
          const valid = await this.$refs.signinForm.validate()
          if (valid) {
            // this.$router.push('/')
            this.submiting = true
            const signed = await signIn(this.form)
            if (signed) {
              // await this.loadAccount()
              if (this.form.remember)
                storage.set('management-remembered-account', this.form)
              else
                storage.remove('management-remembered-account')
              updateSession({ user: signed.user })
              this.$router.push('/')
            }
            this.submiting = false
          }
        } catch (error) {
          this.submiting = false
        }
      }
    },

    async created () {
      this.loading = false
      // this.getConfigPath({ url: window.location.origin })
    }
  }
</script>

<style lang="scss">
  .enterprise-signin-page {
    background-repeat: no-repeat;
    background-position: center top;
    height: 100%;
    position: relative;
    min-width: 1000px;
    min-height: 600px;
    .enterprise-signin-page-content-container {
      width: 380px;
      height: 450px;
      margin: auto;
      .page-title {
        height: 10%;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: center;

        .logo {
          width: 64px;
          height: 64px;
          margin-right: 16px;
          img {
            width: 100%;
            height: 100%;
          }
        }

        .name {
          font-size: 36px;
          font-weight: 500;
          color: #fff;
        }
      }

      .signin-form-container {
        position: relative;
        height: 90%;
        border-radius: 3px;
        background: rgba(255, 255, 255, 1);

        .title {
          height: 25%;
          line-height: 110px;
          text-align: center;
          color: #333;
          font-size: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          > div:first-child {
            display: table-cell;
            > img {
              width: 36px;
              vertical-align: middle;
              margin-right: 9px;
            }
          }
          > div:nth-child(2) {
            font-size: 32px;
          }
        }

        .signin-form {
          height: 75%;
          border-radius: 0 0 5px 5px;
          .account-input {
            height: 58%;
            padding-top: 10px;
            box-sizing: border-box;
          }
          .account-input-prefix {
            width: 20px;
            height: 20px;
          }

          .password-input-prefix {
            width: 16px;
            height: 20px;
            margin: 0 2px;
          }

          .el-form-item {
            width: 80%;
            margin: 0 auto 15px;

            &.is-error {
              .el-input__inner,
              .el-input-group__prepend {
                border: 0;
              }

              .el-input-group {
                border: 1px solid #f56c6c;
                border-radius: 4px;
              }
            }

            &.is-success {
              .el-input__inner,
              .el-input-group__prepend {
                border: 0;
              }
              .el-input {
                height: 44px !important;
                border: 1px solid rgba(210, 210, 210, 1) !important;
                border-radius: 22px !important;
                overflow: hidden !important;
              }
              .el-input-group {
              }
            }
            .el-form-item__content {
              .el-input {
                height: 44px !important;
                border: 1px solid rgba(210, 210, 210, 1) !important;
                border-radius: 22px !important;
                overflow: hidden !important;
                .el-input-group__prepend {
                  border: 0;
                }
                .el-input__inner {
                  border: 0;
                  background: transparent;
                }
                .el-input__inner::-webkit-input-placeholder {
                  background-color: transparent;
                }
              }
            }
          }

          .el-form-item:not(.is-error) {
            .el-input__inner:hover,
            .el-input__inner:focus {
            }
          }
          .el-input__inner {
            background-color: transparent !important;
            color: #666;
          }

          input {
            height: 50px;
            border-left: 0;
          }

          .el-form-item__content {
            line-height: normal;

            .el-input-group__prepend {
              background: transparent;
              padding-right: 0;
            }
          }

          .login-button-wrapper {
            margin-top: 50px;
            .el-form-item__content {
              display: flex;
              justify-content: space-between;
              width: 100%;
              > div {
                width: 50%;
                text-align: center;
              }
              > div:first-child {
                margin-bottom: 10px;
              }
            }

            .login-button {
              width: 100%;
              height: 50px;
              background: linear-gradient(
                305deg,
                rgba(0, 126, 229, 1) 0%,
                rgba(5, 179, 255, 1) 100%,
                rgba(85, 51, 255, 1) 100%
              );
              border-radius: 14px;
              // border: 1px solid rgba(32, 53, 128, 0.16);
              font-size: 24px;
              color: #fff;
            }

            .carousel-button {
              width: 85%;
              height: 50px;
              background: rgba(255, 255, 255, 1);
              border: 1px solid rgba(75, 75, 75, 0.16);
              color: #666;
              font-size: 18px;
              background: transparent;
              border: 0;
              padding: 12px 14px;
              > span {
                display: flex;
                justify-content: center;
                > i {
                  margin-right: 10px;
                }
              }
            }
          }
        }
        .left-top {
          width: 20px;
          height: 20px;
          border-left: 4px solid #b584ff;
          border-top: 4px solid #b584ff;
          position: absolute;
          top: 0;
          left: 0;
        }
        .left-bottom {
          width: 20px;
          height: 20px;
          border-left: 4px solid #b584ff;
          border-bottom: 4px solid #b584ff;
          position: absolute;
          bottom: 0;
          left: 0;
        }
        .right-top {
          width: 20px;
          height: 20px;
          border-right: 4px solid #b584ff;
          border-top: 4px solid #b584ff;
          position: absolute;
          top: 0;
          right: 0;
        }
        .right-bottom {
          width: 20px;
          height: 20px;
          border-right: 4px solid #b584ff;
          border-bottom: 4px solid #b584ff;
          position: absolute;
          right: 0;
          bottom: 0;
        }
      }
    }
    .android-app-qrcode {
      position: absolute;
      bottom: 15px;
      right: 15px;
      width: 120px;
      color: #333;
      font-size: 14px;
      text-align: center;
      color: #fff;

      img {
        width: 100%;
        height: auto;
        vertical-align: top;
        margin-top: 10px;
      }
    }

    .main {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
</style>
