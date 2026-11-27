<template>
  <!-- 只留一个挂载点，不加任何自定义包裹层 -->
  <div id="tcomment"></div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(async () => {
  if (typeof window === 'undefined') return
  
  // 动态引入 Twikoo
  const twikoo = await import('twikoo')
  
  twikoo.init({
    envId: 'https://你的自建地址', // ← 换成你的真实地址
    el: '#tcomment',
    path: '/guestbook/',           // 固定路径，保证数据独立
    lang: 'zh-CN'
  })
})
</script>

<style scoped>
/* 
  这里完全留空。
  Twikoo 自带了一套非常完善的默认样式（包含响应式布局、暗黑模式适配等）。
  不加任何 CSS，呈现出来的就是最原汁原味的官方评论区外观。
*/
</style>