import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user?.role === 'admin';

  const isActive = (path) => location.pathname === path;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {/* Menu Icon for smaller screens */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md shadow-md"
        onClick={toggleSidebar}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white p-4 z-40 transform transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:block`}
      >
        <h2 className="text-xl ms-10 font-bold mb-6 lg:hidden">Menu</h2>
        <ul className="space-y-4">
          <li>
            <a
              href="/"
              className={`block py-2 px-4 rounded transition ${
                isActive('/') ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
            >
              Dashboard
            </a>
          </li>
          {isAdmin && (
            <li>
              <a
                href="/users"
                className={`block py-2 px-4 rounded transition ${
                  isActive('/users') ? 'bg-gray-700' : 'hover:bg-gray-700'
                }`}
              >
                Users
              </a>
            </li>
          )}
          <li>
            <a
              href="/projects"
              className={`block py-2 px-4 rounded transition ${
                isActive('/projects') ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="/tasks"
              className={`block py-2 px-4 rounded transition ${
                isActive('/tasks') ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
            >
              Tasks Status
            </a>
          </li>
        </ul>
      </div>

      {/* Overlay for smaller screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default Sidebar;
