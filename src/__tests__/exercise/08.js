// testing custom hooks
// http://localhost:3000/counter-hook

import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'
import * as React from 'react'
import useCounter from '../../components/use-counter'

const MyCounter = ({initialCount = 0, step = 1} = {}) => {
  const {count, increment, decrement} = useCounter({initialCount, step})

  return (
    <>
      <div>Current count: {count}</div>
      <button onClick={increment}>Increase Count</button>
      <button onClick={decrement}>Decrease Count</button>
    </>
  )
}

test('exposes the count and increment/decrement functions', () => {
  render(<MyCounter />)

  const message = screen.getByText(/current count/i)
  const increaseButton = screen.getByRole('button', {name: /increase count/i})
  const decreaseButton = screen.getByRole('button', {name: /decrease count/i})

  expect(message).toHaveTextContent('Current count: 0')


  userEvent.click(increaseButton)

  expect(message).toHaveTextContent('Current count: 1')

  userEvent.click(increaseButton)

  expect(message).toHaveTextContent('Current count: 2')


  userEvent.click(decreaseButton)

  expect(message).toHaveTextContent('Current count: 1')

  userEvent.click(decreaseButton)
  userEvent.click(decreaseButton)

  expect(message).toHaveTextContent('Current count: -1')
})

test('can set an initial count other than 0', () => {
  const initialCount = faker.datatype.number()

  render(<MyCounter initialCount={initialCount} />)

  const message = screen.getByText(/current count/i)

  expect(message).toHaveTextContent(`Current count: ${initialCount}`)
})

test('can set a different step count', () => {
  const step = faker.datatype.number({min: 2})

  render(<MyCounter step={step}/>)

  const message = screen.getByText(/current count/i)
  const increaseButton = screen.getByRole('button', {name: /increase count/i})
  const decreaseButton = screen.getByRole('button', {name: /decrease count/i})

  let expectedCount = 0

  expect(message).toHaveTextContent(`Current count: ${expectedCount}`)

  userEvent.click(increaseButton)

  expectedCount += step

  expect(message).toHaveTextContent(`Current count: ${expectedCount}`)

  userEvent.click(increaseButton)

  expectedCount += step

  expect(message).toHaveTextContent(`Current count: ${expectedCount}`)

  userEvent.click(decreaseButton)

  expectedCount -= step

  expect(message).toHaveTextContent(`Current count: ${expectedCount}`)

  userEvent.click(decreaseButton)
  expectedCount -= step

  userEvent.click(decreaseButton)
  expectedCount -= step

  expect(message).toHaveTextContent(`Current count: ${expectedCount}`)
})