import DefaultTheme from 'vitepress/theme'
import './custom.css'

// 1. 引入你的留言板组件（请根据实际路径修改）
import Guestbook from './components/guestbook.vue'

export default {
  extends: DefaultTheme,
  
  // 2. 添加 enhanceApp 钩子进行全局注册
  enhanceApp({ app }) {
    app.component('guestbook', Guestbook)
  }
}