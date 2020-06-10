const buildIcon = (menu) => {
  const iconName = menu.icon
  // menu.icon = require(`@/assets/icons/nav-menu/${iconName}.png`)
  // menu.iconHighlight = require(`@/assets/icons/nav-menu/${iconName}-highlight.png`)
  return menu
}

// 菜单配置
const managementMenuItems = [
  {
    name: '首页', //菜单名字
    icon: 'icon_dashboard', //菜单对应的icon图标
    path: '/dashboard', // 与 router 中的路径相对应
  },
  {
    name: '有子菜单的菜单',
    icon: 'icon_study',
    path: '/study',
    items: [
      {
        // 子菜单
        name: '子菜单1',
        path: '/study/online',
        primaryNavPath: '/study',
      },
      {
        name: '子菜单2',
        path: '/study/offline',
        primaryNavPath: '/study',
      },
      {
        name: '子菜单3',
        path: '/study/contribute',
        primaryNavPath: '/study',
      },
    ],
  },
].map(buildIcon)

export default {
  managementMenuItems,
}
