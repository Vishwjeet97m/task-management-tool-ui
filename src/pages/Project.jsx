import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllProjects, deleteProject } from "../apicalls/projects.js";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch projects from API
    const fetchProjects = async () => {
      try {
        const response = await getAllProjects();
        setProjects(response.data);
        console.log("project response--->", response);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleDeleteProject = async (id) => {
    try {
      await deleteProject(id);
      setProjects(projects.filter((project) => project._id !== id));
      console.log(`Project with id ${id} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleEditProject = (project) => {
    // Redirect to project details page with project data
    navigate(`/project/${project._id}`, { state: { project } });
  };

  return (
    <div className="min-h-screen max-w-screen bg-gray-100 p-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex justify-between items-center px-8 py-4 border-b">
          <h1 className="text-3xl font-bold text-gray-800">Projects</h1>
          <Link
            to="/project/add_project"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors duration-200"
          >
            Add Project
          </Link>
        </div>

        <div className="p-8">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-500">#</th>
                <th className="px-6 py-4 font-medium text-gray-500">Name</th>
                <th className="px-6 py-4 font-medium text-gray-500">
                  Description
                </th>
                <th className="px-6 py-4 font-medium text-gray-500">
                  Created By
                </th>
                <th className="px-6 py-4 font-medium text-gray-500">Status</th>
                <th className="px-6 py-4 font-medium text-gray-500 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr
                  key={project._id.$oid}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 border-t">{index + 1}</td>
                  <td
                    className="px-6 py-4 border-t text-blue-600 hover:underline cursor-pointer"
                    onClick={() => navigate(`/project/${project._id}/tasks`)}
                  >
                    {project.name}
                  </td>
                  <td className="px-6 py-4 border-t">{project.description}</td>
                  <td className="px-6 py-4 border-t">
                    {project.owner?.username || "N/A"}
                  </td>
                  <td className="px-6 py-4 border-t">{project.status}</td>
                  <td className="px-6 py-4 border-t text-right space-x-2">
                    <button
                      onClick={() => handleEditProject(project)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project._id)}
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

export default Project;
