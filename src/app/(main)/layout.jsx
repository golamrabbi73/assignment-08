import Navbar from '@/components/shared/Navbar'
import React from 'react'

const MainLayout = ( { children } ) => {
  return (
    <>
        <Navbar />
        {children}
    </>
  )
}

export default MainLayout
