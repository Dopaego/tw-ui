# 笔记
方便复杂内容的生成
## 内容展示
我们使用slot搭配母女组件来生成：
母组件 <Collapse> 女组件 <CollapseItem> 作为Collapse中的每一项。
然后确定ItemProps： name(作为唯一的标识符) title: string(折叠组件的标题) disabled 一个boolen值，决定是否被禁用
再确定CollapseProps： 当前打开的Item： modelValue： string[] modelValue保存着当前打开的对应Item的name， accordin：boolen 是否支持手风琴模式

## 确定事件
1. 点击触发组件的展示或者关闭
2. 更新一开始默认打开的Item

## 思路分析
创建一个响应式数组，维护打开的items组件的状态
通过判断当前name是否存在在数组中

