<template>
  <Transition :name="transitionName" @after-leave="destroyComponent" @enter="updateHeight">
    <div
      class="tw-message"
      role="alert"
      :class="{
        [`tw-message--${type}`]: type,
        'is-close': showClose,
      }"
      v-show="visible"
      ref="messageRef"
      :style="cssStyle"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <div class="tw-message__content">
        <slot>
          <RenderVode :vNode="message" v-if="message" />
        </slot>
      </div>
      <div class="tw-message__close" v-if="showClose">
        <Icon @click.stop="($event) => (visible = false)" icon="xmark" />
      </div>
    </div>
  </Transition>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, getCurrentInstance } from 'vue'
import type { MessageProps } from './types'
import Icon from '../Icon/Icon.vue'
import RenderVode from '../Common/RenderVnode'
import { getLastBottomOffset } from './method'
import useEventListener from '../../hooks/useEventListener'
defineOptions({
  name: 'TwMessage',
  x,
})
const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  duration: 3000,
  offset: 20,
  transitionName: 'fade-up',
  showClose: true,
})
let timer: any
function startTimer() {
  if (props.duration === 0) return
  timer = setTimeout(() => {
    visible.value = false
  }, props.duration)
}
function clearTimer() {
  clearTimeout(timer)
}
const visible = ref(false)
const messageRef = ref<HTMLDivElement>()
// 计算偏移高度
const height = ref(0)
//计算上一个实例的bottomoffset 第一个的是0
const lastOffset = computed(() => getLastBottomOffset(props.id))
//该元素应该使用的top
const topOffset = computed(() => props.offset + lastOffset.value)
//为下一个元素预留offset
const bottomOffset = computed(() => topOffset.value + height.value)
const cssStyle = computed(() => ({
  top: topOffset.value + 'px',
  zIndex: props.zIndex,
}))
//获得当前实例
const instance = getCurrentInstance()
console.log('inner instance', instance)
onMounted(async () => {
  visible.value = true
  startTimer()
  //DOM更新结束后再执行下面的语句，不然无法拿到正确的高度
  // await nextTick()
  // height.value = messageRef.value!.getBoundingClientRect().height
})
function keydown(e: Event) {
  const event = e as KeyboardEvent
  if (event.code === 'Escape') {
    visible.value = false
  }
}
useEventListener(document, 'keydown', keydown)
// watch(visible, (newValue) => {
//     if(newValue === false){
//         props.onDestroy()
//     }
// })
function destroyComponent() {
  props.onDestroy()
}
function updateHeight() {
  height.value = messageRef.value!.getBoundingClientRect().height
}
defineExpose({
  bottomOffset,
  visible,
})
</script>
