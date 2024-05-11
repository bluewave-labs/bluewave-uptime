import React from 'react'
import NavBar from '../../Components/NavBar'
import { Outlet } from 'react-router'
import Home from '../../Pages/Home'
import './index.css'

const HomeLayout = () => {
    return (
        <>
            <NavBar />
            <Home />
            <Outlet />
        </>
    )
}

export default HomeLayout