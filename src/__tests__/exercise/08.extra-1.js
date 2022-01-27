// testing custom hooks
// http://localhost:3000/counter-hook

import {act, render} from '@testing-library/react'
import faker from 'faker'
import * as React from 'react'
import useCounter from '../../components/use-counter'


test('exposes the count and increment/decrement functions', () => {
  let result
  const TestComponent = (props) => {
    result = useCounter(props)

    return null
  }

  render(<TestComponent />)

  expect(result.count).toBe(0)

  act(() => result.increment())

  expect(result.count).toBe(1)

  act(() => result.increment())

  expect(result.count).toBe(2)

  act(() => result.decrement())

  expect(result.count).toBe(1)

  act(() => result.decrement())
  act(() => result.decrement())

  expect(result.count).toBe(-1)
})

test('can set an initial count other than 0', () => {
  const initialCount = faker.datatype.number({min: 1})

  let result
  const TestComponent = (props) => {
    result = useCounter(props)

    return null
  }

  render(<TestComponent initialCount={initialCount} />)

  expect(result.count).toBe(initialCount)
})

test('can set a different step count', () => {
  const step = faker.datatype.number({min: 2})

  let result
  const TestComponent = (props) => {
    result = useCounter(props)

    return null
  }

  render(<TestComponent step={step}/>)

  let expectedCount = 0

  expect(result.count).toBe(expectedCount)

  act(() => result.increment())

  expectedCount += step

  expect(result.count).toBe(expectedCount)

  act(() => result.increment())

  expectedCount += step

  expect(result.count).toBe(expectedCount)

  act(() => result.decrement())

  expectedCount -= step

  expect(result.count).toBe(expectedCount)

  act(() => result.decrement())
  expectedCount -= step

  act(() => result.decrement())
  expectedCount -= step

  expect(result.count).toBe(expectedCount)
})