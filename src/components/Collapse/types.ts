import type { InjectionKey, Ref } from 'vue'

export type NameType = string | number

export interface CollapseProps {
  modelValue: NameType[]
  accordin?: boolean
}

// 定义一个可折叠collapes组件的属性
export interface CollapseItemProps {
  name: NameType
  title?: string
  disabled?: boolean
}

export interface CollapseContext {
  activeNames: Ref<NameType[]>
  handleItemClick: (name: NameType) => void
}
//自定义了两个事件 ，调用时都会发射对应的value
export interface CollapseEmits {
  (e: 'update:modelValue', value: NameType[]): void
  (e: 'change', value: NameType[]): void
}
// 定义一个唯一的 key，用来标识提供的 context
export const collapseContextKey: InjectionKey<CollapseContext> = Symbol('collapseContextKey')
