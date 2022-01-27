// testing custom hooks
// http://localhost:3000/counter-hook

import {act, renderHook} from '@testing-library/react-hooks'
import faker from 'faker'
import useCounter from '../../components/use-counter'


test('exposes the count and increment/decrement functions', () => {
  const { result } = renderHook(() => useCounter())

  expect(result.current.count).toBe(0)

  act(() => result.current.increment())

  expect(result.current.count).toBe(1)

  act(() => result.current.increment())

  expect(result.current.count).toBe(2)

  act(() => result.current.decrement())

  expect(result.current.count).toBe(1)

  act(() => result.current.decrement())
  act(() => result.current.decrement())

  expect(result.current.count).toBe(-1)
})

test('can set an initial count other than 0', () => {
  const initialCount = faker.datatype.number({min: 1})

  const {result} = renderHook(() => useCounter({initialCount}))

  expect(result.current.count).toBe(initialCount)
})

test('can set a different step count', () => {
  const step = faker.datatype.number({min: 2})

  const {result} = renderHook(() => useCounter({step}))

  let expectedCount = 0

  expect(result.current.count).toBe(expectedCount)

  act(() => result.current.increment())

  expectedCount += step

  expect(result.current.count).toBe(expectedCount)

  act(() => result.current.increment())

  expectedCount += step

  expect(result.current.count).toBe(expectedCount)

  act(() => result.current.decrement())

  expectedCount -= step

  expect(result.current.count).toBe(expectedCount)

  act(() => result.current.decrement())
  expectedCount -= step

  act(() => result.current.decrement())
  expectedCount -= step

  expect(result.current.count).toBe(expectedCount)
})

test('the step can be changed', () => {
  const step = faker.datatype.number({min: 2})

  const {result, rerender} = renderHook(useCounter, {initialProps: {step}})

  let expectedCount = 0

  expect(result.current.count).toBe(expectedCount)

  act(() => result.current.increment())

  expectedCount += step

  expect(result.current.count).toBe(expectedCount)

  act(() => result.current.increment())

  expectedCount += step

  expect(result.current.count).toBe(expectedCount)

  act(() => result.current.decrement())

  expectedCount -= step

  expect(result.current.count).toBe(expectedCount)

  const newStep = faker.datatype.number({min: 2})

  rerender({step: newStep})

  act(() => result.current.decrement())
  expectedCount -= newStep

  act(() => result.current.decrement())
  expectedCount -= newStep

  expect(result.current.count).toBe(expectedCount)
})