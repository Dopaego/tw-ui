import type { ComponentInternalInstance, VNode } from 'vue'
export interface MessageProps {
  message?: string | VNode
  duration?: number
  showClose?: boolean
  type?: 'success' | 'info' | 'warning' | 'error'
  onDestroy: () => void
  offset?: number
  id: string
  zIndex: number
  transitionName?: string
}
export interface MessageContext {
  id: string
  vnode: VNode
  props: MessageProps
  vm: ComponentInternalInstance
  destroy: () => void
}
export type createMessageProps = Omit<MessageProps, 'onDestroy' | 'id' | 'zIndex'>
