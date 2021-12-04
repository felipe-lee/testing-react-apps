// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {
  render,
  screen,
  act,
} from '@testing-library/react'
import Location from '../../examples/location'

beforeAll(() => {
  window.navigator.geolocation = {getCurrentPosition: jest.fn()}
})

function deferred() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return {promise, resolve, reject}
}

test('displays the users current location', async () => {
  const fakePosition = {
    coords: {
      latitude: 36,
      longitude: 139,
    },
  }

  const {promise, resolve} = deferred()

  window.navigator.geolocation.getCurrentPosition.mockImplementation(
    (successCallback, errorCallback) => {
      promise
        .then(() => successCallback(fakePosition))
        .catch(() => errorCallback())
    },
  )

  render(<Location />)

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  await act (async () => {
    resolve()

    await promise
  })

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()

  expect(screen.getByText(/latitude/i)).toHaveTextContent(`Latitude: ${fakePosition.coords.latitude}`)

  expect(screen.getByText(/longitude/i)).toHaveTextContent(`Longitude: ${fakePosition.coords.longitude}`)
})

test('displays error when it fails to get the location', async () => {
  const errorMessage = 'Cannot find your location'

  const {promise, reject} = deferred()

  window.navigator.geolocation.getCurrentPosition.mockImplementation(
    (successCallback, errorCallback) => {
      promise
        .then(() => successCallback())
        .catch((err) => {
          console.log("Error with promise!")
          console.log(err)
          errorCallback(err)
        })
    },
  )

  render(<Location />)

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  await act (async () => {
    reject(errorMessage)

    try {
      await promise
    } catch (err) {

    }
  })

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()

  expect(screen.getByRole('alert')).toHaveTextContent(errorMessage)
})