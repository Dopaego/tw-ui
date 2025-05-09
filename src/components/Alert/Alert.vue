<template>
  <div
    class="tw-alert"
    :class="{
      [`tw-button--${type}`]: type,
      'is-closed': closed,
    }"
  >
    <v-slot />
  </div>
</template>
<script setup lang="ts">
import type { AlertProps } from './types'
defineOptions({
  name: 'TwAlert',
})
defineProps<AlertProps>()
</script>
