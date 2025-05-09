<template>
  <div class="tw-collapse">
    <slot />
  </div>
</template>
<script setup lang="ts">
import { ref, provide, watch } from 'vue'
import type { NameType, CollapseProps, CollapseEmits } from './types'
import { collapseContextKey } from './types'

defineOptions({
  name: 'TwCollapse',
})
const props = defineProps<CollapseProps>()
const emits = defineEmits<CollapseEmits>()
const activeNames = ref<NameType[]>(props.modelValue)
watch(
  () => props.modelValue,
  () => {
    activeNames.value = props.modelValue
  },
)
if (props.accordin && activeNames.value.length > 1) {
  console.warn('accordin mode should only have one active item')
}
const handleItemClick = (item: NameType) => {
  if (props.accordin) {
    activeNames.value = [activeNames.value[0] === item ? '' : item]
  } else {
    const index = activeNames.value.indexOf(item)
    if (index > -1) {
      //删除
      activeNames.value.splice(index, 1)
    } else {
      //不存在，添加
      activeNames.value.push(item)
    }
  }
  emits('update:modelValue', activeNames.value)
  emits('change', activeNames.value)
}
provide(collapseContextKey, {
  activeNames,
  handleItemClick,
})
</script>
