import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { addUser, editUser } from '../apicalls/users';

const UserDetails = () => {
  const location = useLocation();
  const isAddMode = location.pathname.includes('add_user');
  const navigate = useNavigate();
  const user = React.useMemo(() => location.state?.user || {}, [location.state]); // Get user data from state
  const [form, setForm] = useState({ username: '', email: '', role: '', password: '' });
  const [error, setError] = useState({ username: '', email: '', role: '', password: '' });
  
  useEffect(() => {
    if (user && !isAddMode) {
      setForm({
        username: user.username || '',
        email: user.email || '',
        role: user.role || '',
        password: '', // Password should remain empty when editing
      });
    }
  }, [user, isAddMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let isValid = true;
    const newError = { username: '', email: '', role: '', password: '' };

    if (!form.username) {
      newError.username = 'Username is required.';
      isValid = false;
    }

    if (!form.email) {
      newError.email = 'Email is required.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newError.email = 'Email is invalid.';
      isValid = false;
    }

    if (!form.role) {
      newError.role = 'Role is required.';
      isValid = false;
    }

    if (isAddMode && !form.password) {
      newError.password = 'Password is required.';
      isValid = false;
    } else if (isAddMode && form.password.length < 6) {
      newError.password = 'Password must be at least 6 characters.';
      isValid = false;
    }

    setError(newError);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (isAddMode) {
        // Call the add user API function
        await addUser(form);
        alert('User added successfully!');
      } else {
        const userId = user._id; 
        // eslint-disable-next-line no-unused-vars
        const { password, ...updatedForm } = form;
        await editUser(updatedForm, userId); 
        alert('User details updated successfully!');
      }
      navigate('/users'); // Redirect back to user listing page
    } catch (error) {
      console.error('Error saving user details:', error);
      alert('Failed to save user details. Please try again.');
    }
  };

  return (
    <div className="min-h-screen max-w-screen bg-gray-100 p-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          {isAddMode ? 'Add User Details' : 'Edit User Details'}
        </h1>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={form.username}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {error.username && <p className="text-red-500 text-sm">{error.username}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-700 font-medium mb-2">
              Role
            </label>
            <input
              type="text"
              name="role"
              id="role"
              value={form.role}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {error.role && <p className="text-red-500 text-sm">{error.role}</p>}
          </div>
          {isAddMode && (
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={form.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {error.password && <p className="text-red-500 text-sm">{error.password}</p>}
            </div>
          )}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/users')}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${
                !isAddMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'
              } text-white px-4 py-2 rounded`}
            >
              {isAddMode ? 'Add' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDetails;
