import { render, h, shallowReactive } from 'vue'
import type { createMessageProps, MessageContext } from './types'
import MessageConstructor from './Message.vue'
import useZIndex from '../../hooks/useZIndex'
let seed = 1
//把instances转换成响应式对象，保证添加新的message时，可以重新计算bottomoffset,浅层响应式保证了只有instances数组改变时才重新计算，性能优化！
const instances: MessageContext[] = shallowReactive([])
export const createMessage = (props: createMessageProps) => {
  const { nextZIndex } = useZIndex()
  const id = `message__${seed++}`
  const container = document.createElement('div')
  const destroy = () => {
    //关闭时删除节点,同时删除数组中的实例
    const idx = instances.findIndex((instance) => instance.id === id)
    if (idx === -1) return
    instances.splice(idx, 1)
    render(null, container)
  }
  const newProps = {
    ...props,
    id,
    zIndex: nextZIndex(),
    onDestroy: destroy,
  }
  //手动删除其实是手动调整组件中visible的值
  // visble使用过expose传出来的
  const manualDestroy = () => {
    const instance = instances.find((instance) => instance.id === id)
    if (instance) {
      instance.vm.exposed!.visible.value = false
    }
  }
  const vnode = h(MessageConstructor, newProps)
  render(vnode, container)
  // 这里的！ 为非空断言操作符，告诉ts一定不是null/undefined
  document.body.appendChild(container.firstElementChild!)
  const vm = vnode.component!
  const instance = {
    id,
    vnode,
    vm,
    props: newProps,
    destroy: manualDestroy,
  }
  instances.push(instance)
  return instance
}

export const getLastInstance = () => {
  //拿到最后一项
  return instances.at(-1)
}

export const getLastBottomOffset = (id: string) => {
  const idx = instances.findIndex((instance) => instance.id === id)
  if (idx <= 0) {
    return 0
  } else {
    const prev = instances[idx - 1]
    return prev.vm.exposed!.bottomOffset.value
  }
}

export const closeAll = () => {
  instances.forEach((instance) => {
    instance.destroy()
  })
}
