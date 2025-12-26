import React, { useState, useContext } from 'react'
import logo from "../assets/logoo.png"
import {assets} from '../assets/assets.js'


import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Navbar = () => {

  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(true)
  const { token, user, logout } = useContext(AppContext);

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
      <img onClick = {() => navigate('/')}src={logo} alt="Logo" className="h-12 w-auto" />

      

      <ul className='hidden md:flex items-start gap-5 font-medium'>
        <NavLink to="/">
            <li className="py-1">
                HOME
            </li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
        </NavLink>
         <NavLink to='/doctors'>
            <li className="py-1">
                DOCTORS
            </li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
        </NavLink>
         <NavLink to='/about'>
            <li className="py-1">
                ABOUT
            </li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
        </NavLink>
         <NavLink to='/contact'>
            <li className="py-1">
                CONTACT US
            </li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
        </NavLink>
      </ul>
      <div className='flex items-center gap-4'>
        { token ? (
          <div className='flex items-center gap-2 cursor-pointer group relative'>
            <img  className=" w-8 rounded-full" src={assets.profile_pic} alt="avatar" />
            <span className='text-sm font-medium'>{user?.name || user?.email}</span>
            <img src={assets.dropdown_icon} alt="" className='w-2.5'  />
            <div className="absolute top-0 right-0 pt-10 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className='min-w-48 bg-white border rounded shadow flex flex-col gap-3 p-4'>
                <p className='text-xs text-gray-500'>Signed in as<br/><span className='font-semibold'>{user?.email}</span></p>
                <hr/>
                <p onClick={()=>navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                <p onClick={()=>navigate('/my-appointment')} className='hover:text-black cursor-pointer'>My Appointments</p>
                <p onClick={logout} className='hover:text-red-600 text-red-500 cursor-pointer'>Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button onClick={() => navigate('/login')} className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block ">Create Account</button>
        ) }

      </div>
    </div>
  )
}

export default Navbar
