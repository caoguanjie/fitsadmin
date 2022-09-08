const steps = [
    //  当元素固定时（fixed）引导的高亮层级会覆盖原来的元素
    {
        element: '#hamburger-container', // 要高亮元素的id或类名
        popover: {
            title: '侧边栏开关',
            description: '打开 && 关闭 侧边栏',
            position: 'bottom' // 提示的位置
        },
    },
    {
        element: '.topMenu',
        popover: {
            title: '顶部菜单',
            description: '顶部菜单',
            position: 'bottom'
        }
    },
    {
        element: '#screenfull',
        popover: {
            title: '全屏',
            description: '全屏显示页面',
            position: 'left'
        }
    },
    {
        element: '.setting ',
        popover: {
            title: '主题设置',
            description: '设置个性化主题',
            position: 'left'
        }
    },
    {
        element: '.avatar-container',
        popover: {
            title: '个人信息',
            description: '查看个人信息',
            position: 'left' // 提示的位置
        }
    },
    {
        element: '.scroll-container',
        popover: {
            title: 'Tags视图',
            description: '您访问的页面的历史记录',
            position: 'bottom'
        },
        padding: 0
    },
    {
        element:'.fits-tabs-more-icon',
        popover:{
            title: 'Tags视图操作',
            description: '操作已打开的Tags视图',
            position: 'left' // 提示的位置
        }
    },
    {
        element: '.footeContainer',
        popover: {
            className: 'guidePage_footerContainer',
            title: '面包屑导航',
            description: '指示当前页面位置',
            position: 'top-left'
        },
        padding:0,
    },
    {
      element: '.sidebar-container',
      popover: {
        className: 'guidePage_sidebar_container',
        title: '侧边栏',
        description: '侧边栏',
        position: 'right-center' // 提示的位置
      },
      padding:0
    },
]
  
  export default steps
  