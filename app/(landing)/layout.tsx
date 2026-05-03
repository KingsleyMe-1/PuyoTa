import React from 'react'
import NavBar from '../shared/components/NavBar'
import Footer from '../shared/components/Footer'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
        <NavBar />
        {children}
    </div>
  )
}

export default Layout