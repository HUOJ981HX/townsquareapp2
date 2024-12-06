// server

import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header/Header.client'
import SubHeader from '../components/SubHeader'
import { auth } from "@/auth";


async function MainLayout({children} : any) {

  const session = await auth();

  return (
    <>
      <Header session={session} />
      <SubHeader />
        {children}
      {/* <Footer /> */}
    </>
  )
}

export default MainLayout