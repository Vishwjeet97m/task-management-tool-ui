import React from 'react'
import logo from '../../assets/images/logo.svg'
import { CiBellOn } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

const Header = () => {
  return (
    <div className='header bg-gray-700 text-white w-full p-4 h-[60px] flex items-center justify-between'>
      <div className='flex items-center'>
        <img src={logo} alt="Logo" className='h-8 w-8' />
        <p className='ml-3 text-xl font-medium'>Task Management Tool</p>
      </div>
      <div className='flex items-center space-x-6'>
        {/* Search input */}
        <div className='flex items-center bg-gray-300 rounded px-3 py-1'>
          <IoIosSearch size={20} className='text-gray-400' />
          <input
            className='ml-2 bg-transparent outline-none text-black placeholder-gray-400'
            type="text"
            name='search'
            placeholder='Search for anything'
          />
        </div>
        <CiBellOn size={24} className='text-gray-400 hover:text-white transition' />
        <div className='flex items-center space-x-3'>
          <div>
            <p className='font-semibold'>Anima Agrawal</p>
            <p className='text-sm text-gray-400'>UP, India</p>
          </div>
          <CgProfile size={30} className='text-gray-400 hover:text-white transition' />
        </div>
      </div>
    </div>
  )
}

export default Header
