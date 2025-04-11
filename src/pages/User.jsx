import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteUser, GetAllUsers } from '../apicalls/users';

// Main Component
const User = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch users from API using the GetAllUsers function
    const fetchUsers = async () => {
      try {
        const response = await GetAllUsers();
        setUsers(response.data);
        console.log("user response--->", response);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user._id !== id));
      console.log(`User with id ${id} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditUser = (user) => {
    navigate(`/user/${user._id}`, { state: { user } });
  };

  return (
    <div className="min-h-screen max-w-screen bg-gray-100 p-4 sm:p-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-8 py-4 border-b">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-0">Users</h1>
          <Link
            to="/user/add_user"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 rounded-md transition-colors duration-200"
          >
            Add User
          </Link>
        </div>

        <div className="p-4 sm:p-8 overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-4 font-medium text-gray-500">#</th>
                <th className="px-4 sm:px-6 py-4 font-medium text-gray-500">Name</th>
                <th className="px-4 sm:px-6 py-4 font-medium text-gray-500">Email</th>
                <th className="px-4 sm:px-6 py-4 font-medium text-gray-500">Role</th>
                <th className="px-4 sm:px-6 py-4 font-medium text-gray-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 sm:px-6 py-4 border-t">{index + 1}</td>
                  <td className="px-4 sm:px-6 py-4 border-t">{user.username}</td>
                  <td className="px-4 sm:px-6 py-4 border-t">{user.email}</td>
                  <td className="px-4 sm:px-6 py-4 border-t">{user.role || 'N/A'}</td>
                  <td className="px-4 sm:px-6 py-4 border-t text-right space-x-2">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default User;
