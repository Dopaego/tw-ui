<template>
  <div class="tw-tooltip" v-on="outEvents" ref="popperContainerNode">
    <div class="tw-tooltip__trigger" ref="triggerNode" v-on="events">
      <slot />
    </div>
    <Transition :name="transition">
      <div v-if="isOpen" class="tw-tooltip__popper" ref="popperNode">
        <slot name="content">
          {{ content }}
        </slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </Transition>
  </div>
</template>
<script setup lang="ts">
import type { TooltipProps, TooltipEmits, TooltipInstance } from './types'
import { createPopper } from '@popperjs/core'
import type { Instance } from '@popperjs/core'
import { reactive, ref, watch, onUnmounted, computed } from 'vue'
import useClickOutside from '../../hooks/useClickOutside'
import { debounce } from 'lodash-es'
defineOptions({
  name: 'TwTooltip',
})
const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'right',
  trigger: 'hover',
  transition: 'fade',
  openDelay: 0,
  closeDelay: 0,
})
const emits = defineEmits<TooltipEmits>()
const isOpen = ref(false)
const popperNode = ref<HTMLElement>()
const triggerNode = ref<HTMLElement>()
const popperContainerNode = ref<HTMLElement>()
let popperInstance: null | Instance = null
let events: Record<string, any> = reactive({})
let outEvents: Record<string, any> = reactive({})
let openTimes = 0
let closeTimes = 0
const popperOptions = computed(() => {
  return {
    placement: props.placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 9],
        },
      },
    ],
    ...props.popperOptions,
  }
})
const togglePopper = () => {
  if (isOpen.value) {
    closeFinal()
  } else {
    openFinal()
  }
}
const open = () => {
  openTimes++
  console.log('open times', openTimes)
  isOpen.value = true
  emits('visible-change', true)
}
const close = () => {
  closeTimes++
  console.log('close times', closeTimes)
  isOpen.value = false
  emits('visible-change', false)
}
//整合短时间内多次触发的回调
const openDebounce = debounce(open, props.openDelay)
const closeDebounce = debounce(close, props.closeDelay)
const openFinal = () => {
  //把close防抖关闭，防止上次的关闭还没执行，导致我要打开的时候不小心执行了关闭
  closeDebounce.cancel()
  openDebounce()
}
const closeFinal = () => {
  openDebounce.cancel()
  closeDebounce()
}
useClickOutside(popperContainerNode, () => {
  if (props.trigger === 'click' && isOpen.value && !props.manual) {
    closeFinal()
  }
})
const attachEvents = () => {
  if (props.trigger === 'hover') {
    events['mouseenter'] = openFinal
    outEvents['mouseleave'] = closeFinal
  } else if (props.trigger === 'click') {
    events['click'] = togglePopper
  }
}
if (!props.manual) {
  attachEvents()
}
watch(
  () => props.trigger,
  (newTrigger, oldTrigger) => {
    if (newTrigger !== oldTrigger) {
      events = {}
      outEvents = {}
      attachEvents()
    }
  },
)
watch(
  () => props.manual,
  (isManual) => {
    if (isManual) {
      events = {}
      outEvents = {}
    } else {
      attachEvents()
    }
  },
)
watch(
  isOpen,
  (newValue) => {
    if (newValue) {
      if (triggerNode.value && popperNode.value) {
        popperInstance = createPopper(triggerNode.value, popperNode.value, popperOptions.value)
      } else {
        popperInstance?.destroy()
      }
    }
  },
  { flush: 'post' },
)
onUnmounted(() => {
  popperInstance?.destroy()
})
defineExpose<TooltipInstance>({
  show: openFinal,
  hide: closeFinal,
})
</script>
