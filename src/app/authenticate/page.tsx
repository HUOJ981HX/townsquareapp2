"use client"

import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import { doGoogleLogin } from './actions';

function AuthenticatePage() {

  const [isRegister, setIsRegister] = useState(false);

  return (
    <>
      <h1>via email</h1>
      {
        isRegister ? <Register /> : <Login />
      }
      <button onClick={() => {
        setIsRegister(!isRegister);
      }}>{isRegister ? "Login" : "Register"}</button>

      <p>--------</p>
      <h2>login via Google</h2>
      <button className="bg-pink-400 text-white p-1 rounded-md m-1 text-lg" onClick={async () => await doGoogleLogin()}>
        Sign In With Google
      </button>
    </>
  )
}

export default AuthenticatePage
