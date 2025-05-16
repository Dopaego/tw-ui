import { describe,expect,vi,test } from "vitest";
import { nextTick } from "vue";
import { closeAll, createMessage } from "./method";

//因为Message组件是通过调用函数来渲染实现的，执行rAF，强制使完成渲染后再测试message
export const rAf = async () => {
    return new Promise((res) => {
        requestAnimationFrame(() => {
            requestAnimationFrame(async () => {
                res(null)
                await nextTick()
            })
        })
    })
}
function getTopValue(element: Element){
    const styles = window.getComputedStyle(element)
    const topValue = styles.getPropertyValue('top')
    return Number.parseFloat(topValue)
}
describe('createMessage', () => {
    test('调用方法应该创建对应的Message组件', async() => {
        const instance = createMessage({ message: 'hello world', duration: 0})
        await rAf()
        console.log('html',document.body.innerHTML)
        expect(document.querySelector('.tw-message')).toBeTruthy()
        instance.destroy()
        await rAf()
        console.log('html2',document.body.innerHTML)
        expect(document.querySelector('.tw-message')).toBeFalsy()

    })
    test('多次调用方法应该创建多个实例', async() => {
        createMessage({ message: 'hello world', duration: 0})
        createMessage({ message: 'hello world2', duration: 0})
        createMessage({ message: 'hello world3', duration: 0})
        await rAf()
        const elelments = document.querySelectorAll('.tw-message')
        expect(elelments.length).toBe(3)

        closeAll()
        await rAf()
        expect(document.querySelector('.tw-message')).toBeFalsy()

    })
    test('创建多个实例应该设置正确的 offset', async () => {
        createMessage({ message: 'hello world', duration: 0,offset: 100})
        createMessage({ message: 'hello world2', duration: 0,offset: 50})
        await rAf()
        const elelments = document.querySelectorAll('.tw-message')
        expect(elelments.length).toBe(2)
        const firstElementTop = getTopValue(elelments[0])
        const secondElementTop = getTopValue(elelments[1])
        expect(firstElementTop).toBe(100)
        expect(secondElementTop).toBe(150)
    })
})