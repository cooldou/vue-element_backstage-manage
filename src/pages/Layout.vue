<template>
  <el-container direction="vertical" class="management-layout-container">
    <el-header class="layout-header" style="height: auto;">
      <div class="layout-header-title">
        <div class="logo">
          <h2 class="h2" @click="handleHome">
            XXXX后台管理系统
          </h2>
        </div>
        <div class="account">
          <div class="user">
            <img src="@/assets/icons/user-fill.png" class="icon">
            <span class="username">{{account.nickname}}</span>
            <i class="el-icon-caret-bottom"></i>
          </div>
          <ul class="menu">
            <router-link tag="li" :to="{ path: '/account' }">
              <img src="@/assets/icons/setting.png" class="setting-icon">
              个人设置
            </router-link>
            <li @click.stop="logout">
              <img src="@/assets/icons/logout.png" class="logout-icon">
              退出登录
            </li>
          </ul>
        </div>
      </div>
    </el-header>

    <el-container class="main-container" style="flex: 1; height: 200px;">
      <el-aside width="200px" :class="{ 'sidebar': true, 'menu-collapsed': menuCollapsed }">
        <el-scrollbar class="scrollbar-wrapper">
          <el-menu :default-active="currentPrimaryNav" mode="vertical" background-color="#FFFFFF" text-color="#666666" active-text-color="#FFFFFF" unique-opened :collapse="menuCollapsed" :collapse-transition="false">
            <template v-for="(item, index) in menuList">
              <el-submenu v-if="item.items && item.items.length > 0" :key="item.path" :index="item.path" popper-class="sidebar-submenu-popup">
                <template slot="title">
                  <div @click.stop="routerTo(item)" class="sub-menu-parent-container">
                    <!-- <img :src="'/static/menu-icon/' + item.icon + '.png'" class="icon icon-no-active" v-if="item.icon">
                    <img :src="'/static/menu-icon/' + item.icon + '_active.png'" class="icon icon-active" v-if="item.icon"> -->
                    <span class="title">{{item.name}}</span>
                  </div>
                </template>

                <el-menu-item v-for="(child, idx) in item.items" :key="child.path" :index="child.path">
                  <div>
                    <router-link slot="title" :to="child.path" class="menu-item-link">
                      <div class="menu-item-speck"></div>
                      <span class="title">{{child.name}}</span>
                    </router-link>
                  </div>
                </el-menu-item>
              </el-submenu>

              <el-menu-item v-else :key="item.path" :index="item.path">
                <div>
                  <router-link slot="title" :to="item.path" class="menu-item-link">
                    <!-- <img :src="'/static/menu-icon/' + item.icon + '.png'" class="icon icon-no-active" v-if="item.icon">
                    <img :src="'/static/menu-icon/' + item.icon + '_active.png'" class="icon icon-active" v-if="item.icon"> -->
                    <span class="title">{{item.name}}</span>
                  </router-link>
                </div>
                <span v-if="menuCollapsed" slot="title">{{item.name}}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </el-scrollbar>

        <div class="menu-minimizer" @click.stop="toggleMenuCollapsed">
          <i class="icon el-icon-arrow-left"></i>
        </div>
      </el-aside>

      <el-container>
        <el-main class="main">
          <router-view class="router-container" />
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
  import { mapState, mapMutations, mapActions } from 'vuex'
  import { getSession, clearSession, updateSession } from '@/modules/authentication'
  import navRoutes from '@/routers/routes'
  import menus from './menus'
  import _ from 'lodash'

  export default {
    name: 'Layout',

    data () {
      return {
        menuCollapsed: false,
        firstIndex: null,
        secondIndex: null,
        secondIndexTow: null,
        childIndex: null,
        account: {}
      }
    },

    computed: {
      ...mapState('account', { user: 'model' }),

      // 菜单列表
      menuList () {
        return menus.managementMenuItems

      },

      // 当前选择的菜单
      currentPrimaryNav () {
        if (this.$route.meta.primaryNavPath) {
          return this.$route.meta.primaryNavPath
        }
        return this.$route.path
      },

      // account () {
      //   return getSession().user
      // }
    },

    methods: {
      ...mapActions('account', { loadAccount: 'loadData' }),

      menusSort (menus) {
        if (menus) {
          const m = _.filter(menus, (menu) => {
            return menu.isButton === 'N'
          })

          let tree = []
          tree = _.filter(m, (item) => {
            return !item.parentId
          })
          tree = _.sortBy(tree, (i) => {
            return i.sorting
          })
          _.each(tree, (t) => {
            this.getChilds(t, m)
          })
          return tree
        }
        return []
      },

      getChilds (t, m) {
        let childs = []

        childs = _.filter(m, (item) => {
          return item.parentId === t.id
        })

        childs = _.sortBy(childs, (i) => {
          return i.sorting
        })
        if (childs && childs.length) t.items = childs
      },

      routerTo (item) {
        if (item.items && item.items.length && this.$route.path !== item.items[0].path) {
          this.$router.push(item.items[0].path)
        }
      },

      toggleMenuCollapsed () {
        this.menuCollapsed = !this.menuCollapsed
      },

      logout () {
        clearSession()
        this.$router.replace({ name: 'signin' })
      },

      handleHome () {
        if (this.$route.path !== '/dashboard')
          this.$router.replace('/dashboard')
      }
    },

    async created () {
      // await this.loadAccount()
      // updateSession({ user: this.user })
    }
  }
</script>
<style lang="scss">
  .el-menu--vertical.sidebar-submenu-popup {
    .el-menu-item {
      height: 44px;
      line-height: 44px;
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 1) 100%
      );
      .menu-item-link {
        text-decoration: none;
        display: flex;
        align-items: center;
        padding-left: 20px;
        padding-right: 20px;
        color: #666;
        font-size: 13px;
        .menu-item-speck {
          display: none;
          margin-right: 5px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #5460ec;
        }
      }
      &.is-active,
      &:hover {
        .menu-item-link {
          color: #5460ec;
          .menu-item-speck {
            display: block;
          }
        }
      }
    }
  }
  .el-tooltip__popper.is-dark {
    background: white;
    color: #666;
    border: 1px solid #666;
  }
  .management-layout-container {
    height: 100%;
    min-width: 1280px;
    min-height: 600px;

    .layout-header {
      padding: 0;
      box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.08);
      z-index: 2;
      .layout-header-title {
        padding: 0 20px;
        height: 40px;
        background-color: white;
        color: #666;
        display: flex;
        justify-content: space-between;
        .logo {
          display: flex;
          align-items: center;
          flex: 1;
          /*img {
              width: 30px;
              height: 30px;
              margin-right: 10px;
            }*/

          .h2 {
            /*background:linear-gradient(90deg,rgba(84,96,236,1) 0%,rgba(109,93,226,1) 100%);*/
            color: #5460ec;
            cursor: pointer;
            font-size: 17px;
          }
        }

        .account {
          position: relative;
          &:hover {
            /*background: #24a3f0;*/
            background: #f6f7fb;
          }
          &:hover > .menu {
            display: block;
          }

          .user {
            display: flex;
            align-items: center;
            height: 100%;
            cursor: pointer;
            padding: 0 20px;

            .icon {
              width: 20px;
              height: 19px;
              margin-right: 15px;
            }

            .username {
              font-size: 14px;
              margin-right: 20px;
            }
          }

          .menu {
            display: none;
            position: absolute;
            top: 40px;
            right: -1px;
            color: #333333;
            background: #fff;
            padding: 0;
            margin: 0;
            list-style: none;
            border-radius: 2px;
            border: 1px solid #e6e6e6;
            border-top: 0;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            width: 160px;
            z-index: 9999;

            li {
              display: flex;
              align-items: center;
              font-size: 14px;
              height: 50px;
              padding: 0 16px;
              cursor: pointer;
              &:hover {
                background: #f6f7fb;
              }
              &:first-child {
                border-bottom: 1px solid #e6e6e6;
              }

              .setting-icon {
                width: 18px;
                height: 12px;
                margin-right: 16px;
              }

              .logout-icon {
                width: 16px;
                height: 18px;
                margin-right: 16px;
              }
            }
          }
        }
      }
    }

    .main {
      background: #f6f7fb;
      padding: 0;
      height: 100%;
    }

    .sidebar {
      box-shadow: 2px 0px 8px 0px rgba(0, 0, 0, 0.08);
      z-index: 1;
      overflow: hidden;
      &.menu-collapsed {
        width: 64px !important;
        .sub-menu-parent-container {
          display: flex;
          height: 100%;
          justify-content: center;
          .icon {
            margin-right: 0 !important;
          }
        }
        .el-menu {
          .el-menu-item,
          .el-submenu__title {
            .el-tooltip {
              padding: 0 !important;
              > div {
                height: 100%;
              }
            }

            .menu-item-link {
              height: 100%;
              justify-content: center;

              .icon {
                margin-right: 0;
              }
            }
          }

          .el-submenu .el-submenu__title {
            .menu-item-link {
              height: 100%;
              justify-content: center;
              .icon {
                margin-right: 0;
              }
            }
          }
        }

        .menu-minimizer .icon {
          transform: rotate(180deg);
        }
      }

      .scrollbar-wrapper {
        height: calc(100% - 40px);
        /*background-image: url('/static/images/menu_bg.png');*/
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;
        .el-scrollbar__wrap {
          overflow: auto;
        }
        .el-scrollbar__view {
          height: 100%;
        }

        .is-horizontal {
          display: none;
        }
      }

      .el-menu {
        border-right: 0;
        .icon-active {
          display: none;
        }
        .icon-no-active {
          display: block;
        }
        /*有二级菜单的*/
        .el-submenu {
          .el-submenu__title {
            height: 44px;
            line-height: 44px;
            .sub-menu-parent-container {
              text-decoration: none;
              display: flex;
              align-items: center;
              font-size: 13px;
              .icon {
                width: 16px;
                height: auto;
                margin-right: 5px;
              }
            }
            .menu-item-link {
              text-decoration: none;
              display: flex;
              align-items: center;
              font-size: 13px;

              .icon {
                width: 16px;
                height: auto;
                margin-right: 5px;
              }
            }
          }
          &.is-active,
          &:hover {
            .el-submenu__title {
              background: linear-gradient(
                90deg,
                rgba(84, 96, 236, 1) 0%,
                rgba(109, 93, 226, 1) 100%
              );
              .title {
                color: #fff !important;
              }
              i {
                color: #fff !important;
              }
              .sub-menu-parent-container {
                .icon-active {
                  display: block;
                }
                .icon-no-active {
                  display: none;
                }
              }
              .menu-item-link {
                color: #fff;
                .icon-active {
                  display: block;
                }
                .icon-no-active {
                  display: none;
                }
              }
            }
          }
          .el-menu-item {
            padding-left: 20px !important;
          }
        }
        /*所有菜单*/
        .el-menu-item {
          height: 44px;
          line-height: 44px;
          padding-left: 0 !important;
          padding-right: 0;
          .menu-item-link {
            text-decoration: none;
            display: flex;
            align-items: center;
            padding-left: 20px;
            padding-right: 20px;
            color: #666;
            font-size: 13px;
            .menu-item-speck {
              display: none;
              margin-right: 5px;
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background-color: #5460ec;
            }
            .icon {
              width: 16px;
              height: auto;
              margin-right: 5px;
            }
          }

          &.is-active,
          &:hover {
            background: linear-gradient(
              90deg,
              rgba(84, 96, 236, 1) 0%,
              rgba(109, 93, 226, 1) 100%
            );
            .menu-item-link {
              color: #fff;
              .icon-active {
                display: block;
              }
              .icon-no-active {
                display: none;
              }
            }
          }
        }
        /*二级菜单*/
        .el-menu--inline {
          .el-menu-item {
            background: linear-gradient(
              90deg,
              rgba(255, 255, 255, 1) 0%,
              rgba(255, 255, 255, 1) 100%
            );
            &.is-active,
            &:hover {
              .menu-item-link {
                color: #5460ec;
                .menu-item-speck {
                  display: block;
                }
              }
            }
          }
        }

        .el-menu-item-group {
          .el-menu-item-group__title {
            padding-top: 10px;
            padding-bottom: 10px;
            color: #5e6369;
            font-size: 12px;
            line-height: 16px;
          }
        }
      }

      .menu-minimizer {
        height: 40px;
        text-align: center;
        color: #c9d4f6;
        line-height: 40px;
        cursor: pointer;
        .icon {
          transition: transform 0.25s;
          font-weight: 900;
          font-size: 20px;
        }
      }
    }
  }
</style>
