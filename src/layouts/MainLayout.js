import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Banner from '../components/Banner/Banner'
import FloatingButton from '../components/FloatingButton/FloatingButton'
import Footer from '../components/Footer/Footer'
import BottomTab from '../components/BottomTab/BottomTab'

const MainLayout = () => {
  return (
    <>
    <Banner />
    <Navbar />
    <Outlet /> {/* page content */}
    <FloatingButton />
    <Footer />
    <BottomTab />
    </>
  )
}

export default MainLayout