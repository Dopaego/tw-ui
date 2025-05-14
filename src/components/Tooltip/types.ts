import type { Placement, Options } from '@popperjs/core'
export interface TooltipProps {
  content?: string
  trigger?: 'hover' | 'click'
  placement: Placement
  manual?: boolean
  popperOptions?: Partial<Options>
  transition?: string
  openDelay?: number
  closeDelay?: number
}
// 用来约束Tooltip中的事件，自定义了一个‘visible-change’事件，会发射一个boolean值
export interface TooltipEmits {
  (e: 'visible-change', value: boolean): void
}
//手动操作
export interface TooltipInstance {
  show: () => void
  hide: () => void
}
