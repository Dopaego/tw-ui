<template>
  <!--这里使用:class 可以动态绑定div组件的是否是disabled，决定了该组件折不折叠，展不展示 -->
  <div
    class="tw-collapse-item"
    :class="{
      'is-disabled': disabled,
    }"
  >
    <!-- 标准命名 在tw-collapse-item类之内，要使用双下划线，如果是同级且改变了样式则使用中划线 -->

    <div
      class="tw-collapse-item__header"
      :class="{
        'is-disabled': disabled,
        'is-active': isActive,
      }"
      :id="`item-header-${name}`"
      @click="handleClick"
    >
      <slot name="title">{{ title }}</slot>
      <Icon icon="angle-right" class="header-angle" />
    </div>
    <Transition name="slide" v-on="transitionEvent">
      <div class="tw-collapse-item__wrapper" v-show="isActive">
        <div class="tw-collapse-item__content" :id="`item-content-${name}`">
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>
<script setup lang="ts">
import type { CollapseItemProps } from './types'
import { inject, computed } from 'vue'
import { collapseContextKey } from './types'
import Icon from '../Icon/Icon.vue'
defineOptions({
  name: 'TwCollapseItem',
})
const props = defineProps<CollapseItemProps>()
const collapseContext = inject(collapseContextKey)
const isActive = computed(() => collapseContext?.activeNames.value.includes(props.name))
const handleClick = () => {
  if (props.disabled) return
  collapseContext?.handleItemClick(props.name)
}
const transitionEvent: Record<string, (el: HTMLElement) => void> = {
  beforeEnter(el) {
    el.style.height = '0px'
    el.style.overflow = 'hidden'
  },
  enter(el) {
    el.style.height = `${el.scrollHeight}px`
  },
  afterEnter(el) {
    el.style.height = ''
    el.style.overflow = ''
  },
  beforeLeave(el) {
    el.style.height = `${el.scrollHeight}px`
    el.style.overflow = 'hidden'
  },
  leave(el) {
    el.style.height = '0px'
  },
  afterLeave(el) {
    el.style.height = ''
  },
}
</script>
<style>
.tw-collapse-item__header {
  font-size: 30px;
}
</style>
