import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

function MainLayout({children} : any) {
  return (
    <>
      <Header />
        {children}
      <Footer />
    </>
  )
}

export default MainLayout