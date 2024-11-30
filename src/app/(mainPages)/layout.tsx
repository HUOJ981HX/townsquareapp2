import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import SubHeader from '../components/SubHeader'

function MainLayout({children} : any) {
  return (
    <>
      <Header />
      <SubHeader />
        {children}
      {/* <Footer /> */}
    </>
  )
}

export default MainLayout