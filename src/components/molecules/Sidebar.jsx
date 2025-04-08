import React from 'react'

const Sidebar = () => {
  return (
    <div className='sidebar bg-gray-800 text-white h-screen w-64 p-4'>
      <ul className='sidebar-menu space-y-4'>
        <li className='sidebar-item'>
          <a
            href='/'
            className='block py-2 px-4 rounded hover:bg-gray-700 transition'
          >
            Dashboard
          </a>
        </li>
        <li className='sidebar-item'>
          <a
            href='/users'
            className='block py-2 px-4 rounded hover:bg-gray-700 transition'
          >
            Users
          </a>
        </li>
        <li className='sidebar-item'>
          <a
            href='/projects'
            className='block py-2 px-4 rounded hover:bg-gray-700 transition'
          >
            Projects
          </a>
        </li>
        <li className='sidebar-item'>
          <a
            href='/tasks'
            className='block py-2 px-4 rounded hover:bg-gray-700 transition'
          >
            Tasks
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
