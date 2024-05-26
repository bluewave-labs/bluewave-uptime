import NavBar from '../../Components/NavBar'
import { Outlet } from 'react-router'
import Home from '../../Pages/Home'
import './index.css'
import ChartsOverviewDemo from '../../Components/DashboardProgressBars'


const HomeLayout = () => {
    return (
        <>
            <NavBar />
            <Home />
            <Outlet />
            <ChartsOverviewDemo />
        </>
    )
}

export default HomeLayout