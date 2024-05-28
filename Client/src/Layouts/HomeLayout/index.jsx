import NavBar from '../../Components/NavBar'
import { Outlet } from 'react-router'
import Home from '../../Pages/Home'
import './index.css'
import ChartsOverviewDemo from '../../Components/DashboardProgressBars'
import DashboardSettings from '../../Components/DashboardSettingsIcon'


const HomeLayout = () => {
    return (
        <>
            <NavBar />
            <Home />
            <Outlet />
            <ChartsOverviewDemo />
            <DashboardSettings />
        </>
    )
}

export default HomeLayout