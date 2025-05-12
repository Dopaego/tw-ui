import { describe,expect,test,vi,beforeAll } from "vitest";
import { mount  } from '@vue/test-utils';
import { type VueWrapper,DOMWrapper } from '@vue/test-utils'
import Collapse from "./Collapse.vue";
import Item from'./CollapseItem.vue';
import { h } from "vue";
import { before } from "node:test";
import { first } from "lodash-es";

const onChange = vi.fn()
let wrapper: VueWrapper
let headers: DOMWrapper<Element>[],contents: DOMWrapper<Element>[]
let firstContent: DOMWrapper<Element>, secondContent: DOMWrapper<Element>, disabledContent: DOMWrapper<Element>,
  firstHeader: DOMWrapper<Element>, secondHeader: DOMWrapper<Element>, disabledHeader: DOMWrapper<Element>

describe('Collapse.vue', () => {
    beforeAll(() => {
        wrapper = mount(() => 
            <Collapse modelValue={['a']} onChange={onChange}>
              <Item name="a" title="title a">
                content a
              </Item>
              <Item name="b" title="title b">
                content b
              </Item>
              <Item name="c" title="title c" disabled>
                content c
              </Item>
            </Collapse>
          , {
            global: {
              stubs: ['Icon']
            },
            attachTo: document.body
          })
          headers = wrapper.findAll('.tw-collapse-item__header')
          contents = wrapper.findAll('.tw-collapse-item__wrapper')
          firstHeader = headers[0]
          secondHeader = headers[1]
          disabledHeader = headers[2]
          firstContent = contents[0]
          secondContent = contents[1]
          disabledContent = contents[2]
    })
    test('点击标题展开/关闭内容', async () => {
        await firstHeader.trigger('click')
        expect(firstContent.isVisible()).toBeFalsy()
        await secondHeader.trigger('click')
        expect(secondContent.isVisible()).toBeTruthy()
    })
    test('发送正确的事件',async () => {
        expect(onChange).toHaveBeenCalledTimes(2)
        expect(onChange).toHaveBeenCalledWith([])
        expect(onChange).toHaveBeenLastCalledWith(['b'])
    })
    test.only('disabled 的内容应该没有反应',async () => {
        onChange.mockClear()
        expect(disabledHeader.classes()).toContain('is-disabled')
        await disabledHeader.trigger('click')
        expect(disabledContent.isVisible()).toBeFalsy()
        expect(onChange).not.toHaveBeenCalled()
    })
})