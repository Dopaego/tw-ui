# Message组件

## 需求分析
1. 特定行为之后弹出提示或者VNode
2. 提示一定时间后消失
3. 可以弹出多个提示
4. 手动关闭
5. 多种类型提示（样式）

## 难点
- 使用函数式来创建组件
- 弹出多个提示，根据旧提示的位置来判断新提示的位置
  
## 属性分析
- message
- duration
- showClose
- type

**以函数方式创建组件**
## 将组件渲染到DOM节点上
这里使用render函数
render(vNode, DOM节点)

**确定多个Message弹出时，第n个组件的位置**
第n个组件的top是 第n - 1个组件的botttomOffset + 第n 个组件的props.offset