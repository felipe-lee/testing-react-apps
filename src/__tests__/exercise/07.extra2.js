// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import EasyButton from 'components/easy-button'
import {ThemeProvider} from 'components/theme'

const renderWithTheme = (ui, {theme = 'light', ...options} = {}) => {
  const Wrapper = ({children}) => {
    return <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
  }

  return render(ui, {wrapper: Wrapper, ...options})
}

test.each([
  {theme: 'light', backgroundColor: 'white', color: 'black'},
  {theme: 'dark', backgroundColor: 'black', color: 'white'},
])('renders with the expected styles for each theme', ({theme, backgroundColor, color}) => {
  renderWithTheme(<EasyButton>Easy</EasyButton>, {theme})

  const button = screen.getByRole('button', {name: /easy/i})

  expect(button).toHaveStyle({
    backgroundColor,
    color,
  })
})