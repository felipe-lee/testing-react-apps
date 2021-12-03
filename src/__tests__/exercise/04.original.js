// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', () => {
  let submittedData

  const expectedData = {
    username: 'bestcat',
    password: 'allthecats'
  }

  const handleSubmit = data => submittedData = data

  render(<Login onSubmit={handleSubmit} />)

  const usernameField = screen.getByLabelText(/username/i)
  const passwordField = screen.getByLabelText(/password/i)

  userEvent.type(usernameField, expectedData.username)
  userEvent.type(passwordField, expectedData.password)

  const submitButton = screen.getByRole('button', { name: /submit/i })

  userEvent.click(submitButton)
  expect(submittedData).toEqual(expectedData)
})
