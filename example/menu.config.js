/**
 * 导航菜单配置
 */
export default [
  {
    title : '基础',
    children : [
      {
        name : 'Button 按钮',
        path : '/button'
      }
    ]
  },
  {
    title : '反馈',
    children : [
      {
        name : 'Message 消息提示',
        path : '/message'
      },
      {
        name : 'Notification 通知提醒',
        path : '/notification'
      },
      {
        name : 'Modal 对话框',
        path : '/modal'
      },
      {
        name : 'Drawer 抽屉',
        path : '/drawer'
      },
      {
        name : 'Popconfirm 气泡确认框',
        path : '/popconfirm'
      },
      {
        name : 'Progress 进度条',
        path : '/progress'
      },
      {
        name : 'Loading 加载中',
        path : '/loading'
      }
    ]
  }
]