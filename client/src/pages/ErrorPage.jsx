import React from 'react'
import { useRouteError } from 'react-router-dom'

function ErrorPage() {
    const error = useRouteError()
  return (
    <div id='error-page'>
      <h1>Opps!</h1>
      <p>Sorry, an unexcepted error has occurred</p>
      <p>
        <i>{error.statusText||error.message}</i>
      </p>
    </div>
  )
}

export default ErrorPage
