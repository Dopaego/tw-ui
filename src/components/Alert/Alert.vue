<template>
  <Transition name="fade">
    <div
      class="tw-alert"
      :class="{
        [`tw-alert--${type}`]: type,
        'is-closed': closed,
        [`tw-alert--${effect}`]: effect,
      }"
      v-show="show"
    >
      <div class="tw-alert-content">
        <slot />
      </div>
      <Icon icon="delete-left" v-if="closed" @click="closeAlert" />
    </div>
  </Transition>
</template>
<script setup lang="ts">
import type { AlertProps } from './types'
import Icon from '../Icon/Icon.vue'
import { ref } from 'vue'
defineOptions({
  name: 'TwAlert',
})
//添加默认为light
withDefaults(defineProps<AlertProps>(), {
  effect: 'light',
})
const show = ref(true)
const closeAlert = () => {
  show.value = false
}
</script>
