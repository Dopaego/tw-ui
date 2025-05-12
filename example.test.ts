import { describe, expect, Mocked, test, vi } from 'vitest'
import { testFn, request } from './utils'
import axios from 'axios'

vi.mock('axios')

const mockedAxios = axios as Mocked<typeof axios>
//callback test
describe('function', () => {
  test('create a mock function', () => {
    const callback = vi.fn()
    testFn(11, callback)
    expect(callback).toHaveBeenCalled()
    expect(callback).toHaveBeenCalledWith(11)
  })
  test('spy on method', () => {
    const obj = {
      getName: () => 1,
    }
    const spy = vi.spyOn(obj, 'getName')
    obj.getName()
    expect(spy).toHaveBeenCalled()
    obj.getName()
    expect(spy).toHaveBeenCalledTimes(2)
  })
  test('mock third party module', async () => {
    // mockedAxios.get.mockImplementation(() => Promise.resolve({data : 123}))
    mockedAxios.get.mockResolvedValue({ data: 123 })
    const result = await request()
    expect(result).toBe(123)
  })
})
