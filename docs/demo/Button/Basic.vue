<script setup lang="ts">
import TwButton from '@/components/Button/Button.vue'
defineOptions({
  name: 'BasicButton',
})
</script>
<template>
  <TwButton> hello </TwButton>
  <TwButton type="primary"> Primary </TwButton>
  <TwButton type="danger"> Danger </TwButton>
  <TwButton loading> Loading </TwButton>
</template>
