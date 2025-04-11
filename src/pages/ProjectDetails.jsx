import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreateProject, editProject } from '../apicalls/projects';

const ProjectDetails = () => {
  const location = useLocation();
  const isAddMode = location.pathname.includes('add_project');
  const navigate = useNavigate();
  const project = React.useMemo(() => location.state?.project || {}, [location.state]);
  const [form, setForm] = useState({ name: '', description: '', status: '' });
  const [error, setError] = useState({ name: '', description: '', status: '' });

  useEffect(() => {
    if (project) {
      setForm({
        name: project.name || '',
        description: project.description || '',
        status: project.status || '',
      });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let isValid = true;
    const newError = { name: '', description: '', status: '' };

    if (!form.name) {
      newError.name = 'Project name is required.';
      isValid = false;
    }

    if (!form.description) {
      newError.description = 'Description is required.';
      isValid = false;
    }

    if (!form.status) {
      newError.status = 'Status is required.';
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
        await CreateProject(form);
        alert('Project added successfully!');
      } else {
        const projectId = project._id;
        await editProject(form, projectId);
        alert('Project details updated successfully!');
      }
      navigate('/projects');
    } catch (error) {
      console.error('Error saving project details:', error);
      alert('Failed to save project details. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden p-4 sm:p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
          {isAddMode ? 'Add New Project' : 'Edit Project Details'}
        </h1>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Project Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error.name && <p className="text-red-500 text-sm">{error.name}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={form.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error.description && <p className="text-red-500 text-sm">{error.description}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block text-gray-700 font-medium mb-2">
              Status
            </label>
            <select
              name="status"
              id="status"
              value={form.status}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select status
              </option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            {error.status && <p className="text-red-500 text-sm">{error.status}</p>}
          </div>
          <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              type="button"
              onClick={() => navigate('/projects')}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full sm:w-auto"
            >
              {isAddMode ? 'Add Project' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectDetails;
