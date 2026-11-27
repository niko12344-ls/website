# 个人wiki

个人wiki



---

本站使用 Markdown 编写，由 VitePress 生成。

## 意见板

<div id="twikoo"></div>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const initTwikoo = () => {
    twikoo.init({
      envId: 'https://twikoo.123472.xyz/',
      el: '#twikoo',
    })
  }

  if (window.twikoo) {
    initTwikoo()
    return
  }

  const script = document.createElement('script')
  script.src = 'https://cdn.jsdelivr.net/npm/twikoo@2.0.17/dist/twikoo.min.js'
  script.onload = initTwikoo
  document.head.appendChild(script)
})
</script>