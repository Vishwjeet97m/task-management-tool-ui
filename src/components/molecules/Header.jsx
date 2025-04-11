import React from 'react'
import logo from '../../assets/images/logo.svg'
import { CiBellOn } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

const Header = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload(); // Reload the page to reflect logout
  };

  return (
    <div className='header bg-gray-700 text-white w-full p-4 h-[60px] flex items-center justify-between'>
      <div className='flex items-center'>
        <img src={logo} alt="Logo" className='h-8 w-8' />
        <p className='ml-3 text-xl font-medium hidden sm:block'>Task Management Tool</p>
      </div>
      <div className='flex items-center space-x-4 sm:space-x-6'>
        {/* Search input */}
        <div className='hidden sm:flex items-center bg-gray-300 rounded px-3 py-1'>
          <IoIosSearch size={20} className='text-gray-400' />
          <input
            className='ml-2 bg-transparent outline-none text-black placeholder-gray-400'
            type="text"
            name='search'
            placeholder='Search for anything'
          />
        </div>
        <CiBellOn size={24} className='text-gray-400 hover:text-white transition' />
        <div className='relative'>
          <div
            className='flex items-center space-x-3 cursor-pointer'
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className='hidden sm:block'>
              <p className='font-semibold'>{user?.username || 'Guest'}</p>
              <p className='text-sm text-gray-400'>{user?.role || "user"}</p>
            </div>
            <CgProfile size={30} className='text-gray-400 hover:text-white transition' />
          </div>
          {dropdownOpen && (
            <div className='absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg'>
              <button
                className='block w-full text-left px-4 py-2 hover:bg-gray-200'
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header
