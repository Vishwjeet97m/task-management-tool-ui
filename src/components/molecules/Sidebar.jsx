import React from 'react';
import { useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user?.role === 'admin'; // Assuming the user object has a 'role' property

  const isActive = (path) => location.pathname === path;

  return (
    <div className='sidebar bg-gray-800 text-white h-screen w-64 p-4'>
      <ul className='sidebar-menu space-y-4'>
        <li className='sidebar-item'>
          <a
            href='/'
            className={`block py-2 px-4 rounded transition ${
              isActive('/') ? 'bg-gray-700' : 'hover:bg-gray-700'
            }`}
          >
            Dashboard
          </a>
        </li>
        {isAdmin && (
          <li className='sidebar-item'>
            <a
              href='/users'
              className={`block py-2 px-4 rounded transition ${
                isActive('/users') ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
            >
              Users
            </a>
          </li>
        )}
        <li className='sidebar-item'>
          <a
            href='/projects'
            className={`block py-2 px-4 rounded transition ${
              isActive('/projects') ? 'bg-gray-700' : 'hover:bg-gray-700'
            }`}
          >
            Projects
          </a>
        </li>
        <li className='sidebar-item'>
          <a
            href='/tasks'
            className={`block py-2 px-4 rounded transition ${
              isActive('/tasks') ? 'bg-gray-700' : 'hover:bg-gray-700'
            }`}
          >
            Tasks Status
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
