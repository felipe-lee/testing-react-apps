// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'
import Login from '../../components/login'

const loginFormBuilder = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  }
})

test('submitting the form calls onSubmit with username and password', () => {
  const {username, password} = loginFormBuilder()

  const handleSubmit = jest.fn()

  render(<Login onSubmit={handleSubmit} />)

  const usernameField = screen.getByLabelText(/username/i)
  const passwordField = screen.getByLabelText(/password/i)

  userEvent.type(usernameField, username)
  userEvent.type(passwordField, password)

  const submitButton = screen.getByRole('button', { name: /submit/i })

  userEvent.click(submitButton)

  expect(handleSubmit).toHaveBeenCalledWith({username, password})
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})
