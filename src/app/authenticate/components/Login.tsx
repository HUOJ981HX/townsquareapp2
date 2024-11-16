import React from 'react'
import { doCredentialLogin } from '../../../actions/authenticate'

function Login() {
  return (
    <div>
      <h1>Login via email below</h1>
      <form action={doCredentialLogin}>
      {/* <form action={(formData) => doCredentialLogin(formData)}> */}
        <input type="email" id="email" name="email" required />
        <input type="password" id="password" name="password" required />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login