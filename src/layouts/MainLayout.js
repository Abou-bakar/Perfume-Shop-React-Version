import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Banner from '../components/Banner/Banner'
import FloatingButton from '../components/FloatingButton/FloatingButton'
import Footer from '../components/Footer/Footer'
import BottomTab from '../components/BottomTab/BottomTab'
import MobileCategories from '../components/Categories/CategoriesMobile'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainLayout = () => {
  return (
    <>
    <Banner />
    <Navbar />
    <Outlet /> {/* page content */}
    
     {/* Toasts */}
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        pauseOnHover
        closeOnClick
        theme="light"
      />

    <FloatingButton />
    <Footer />
    <BottomTab />
    </>
  )
}

export default MainLayout