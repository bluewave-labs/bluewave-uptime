
import { Routes, Route } from 'react-router-dom'
import './App.css'
import NotFound from './Pages/NotFound'
import Login from './Pages/Login'
import Register from './Pages/Register'
import HomeLayout from './Layouts/HomeLayout'


function App() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<HomeLayout />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/login' element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App

