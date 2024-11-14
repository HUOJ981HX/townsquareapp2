"use client"

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AccountType } from '@/types';
import { handleEmailSubmit } from './helpers/client';

function AuthenticatePage() {

  const [accountType, setAccountType] = useState("")

  const router = useRouter();

  // const handleEmailSubmit = async (formData: FormData, ) => {
  //   const haveUser = await submitEmail(formData);

  //   if (haveUser) {
  //     console.log('vvvvvvvvvvvvvvvvvvv');
  //     // setAccountType(AccountType.Google);
  //     setAccountType(AccountType.Email);
  //   }
  //   else {
  //     console.log('xxxxxxxxxxxxxxxxxxxxxx');
  //   }
  // };

  const getPanel = (accountTypeArg: string) => {
    let panel = (
      <div>
        <h1>Enter your email to get started</h1>
        {/* <form action={handleEmailSubmit}> */}
        <form action={(formData) => handleEmailSubmit(formData, setAccountType)}>
          <input type="email" id="email" name="email" required />
          <button type='submit'>Submit</button>
        </form>
      </div>
    );

    switch (accountTypeArg) {
      case AccountType.Google:
        panel = (
          <div>
            <p>Google</p>
          </div>
        )
        break;

      case AccountType.Email:
        panel = (
          <div>
            <h1>Welcome back</h1>
            <h2>Enter your password</h2>
            {/* <form action={handleEmailSubmit}>
              <input type="password" id="password" name="password" required />
              <button type='submit'>Submit</button>
            </form> */}
          </div>
        )
        break;

      default:

        break;
    }

    console.log('ddddddddddddddddddddddd');
    return panel;
  }

  return (
    <>
      {getPanel(accountType)}
    </>
  )
}

export default AuthenticatePage
