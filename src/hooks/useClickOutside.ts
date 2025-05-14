import type { Ref } from 'vue'
import { onMounted, onUnmounted } from 'vue'
//定义了一个方法，当弹出框是click类型时，不止有点击本身可以关闭，点击外部其他部分也可以关闭
// 传入第一个参数是一个响应式 DOM节点，第二个是回调函数
const useClickOutside = (
  elementRef: Ref<undefined | HTMLElement>,
  callback: (e: MouseEvent) => void,
) => {
  const handler = (e: MouseEvent) => {
    //确定要关闭的节点是存在的
    if (elementRef.value && e.target) {
      //不属于要关闭的节点，调用回调函数关闭。
      if (!elementRef.value.contains(e.target as HTMLElement)) {
        callback(e)
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
}

export default useClickOutside
