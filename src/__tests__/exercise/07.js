// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from 'react'
import EasyButton from 'components/easy-button'
import {render, screen} from 'test/test-utils'

test.each([
  {theme: 'light', backgroundColor: 'white', color: 'black'},
  {theme: 'dark', backgroundColor: 'black', color: 'white'},
])('renders with the expected styles for each theme', ({theme, backgroundColor, color}) => {
  render(<EasyButton>Easy</EasyButton>, {theme})

  const button = screen.getByRole('button', {name: /easy/i})

  expect(button).toHaveStyle({
    backgroundColor,
    color,
  })
})