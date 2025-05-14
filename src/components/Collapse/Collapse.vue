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
  let _activeNames = [...activeNames.value]
  if (props.accordin) {
    _activeNames = [activeNames.value[0] === item ? '' : item]
    activeNames.value = _activeNames
  } else {
    const index = _activeNames.indexOf(item)
    if (index > -1) {
      //删除
      _activeNames.splice(index, 1)
    } else {
      //不存在，添加
      _activeNames.push(item)
    }
    activeNames.value = _activeNames
  }
  emits('update:modelValue', activeNames.value)
  emits('change', activeNames.value)
}
// 提供 collapseContext
provide(collapseContextKey, {
  activeNames,
  handleItemClick,
})
</script>
