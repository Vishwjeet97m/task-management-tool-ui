import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTaskById, CreateTask, updateTaskById } from "../apicalls/tasks";
import { GetAllUsers } from "../apicalls/users";
import { FaFilePdf, FaTimes } from "react-icons/fa";
import { getAllProjects } from "../apicalls/projects";
import { uploadFilesToS3 } from "../utils/commonUtils";

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAddMode = !id; // If no id, it's add mode
  const [form, setForm] = useState({
    task_name: "",
    description: "",
    status: "",
    assigner: "",
    assignee: "",
    project: "",
  });
  const [error, setError] = useState({
    task_name: "",
    description: "",
    status: "",
    assigner: "",
    assignee: "",
    project: "",
  });
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [existingAttachments, setExistingAttachments] = useState([]);
  const [newAttachments, setNewAttachments] = useState([]);

  useEffect(() => {
    // Get user from local storage and check role
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.role === "admin") {
      setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    if (!isAddMode) {
      const fetchTask = async () => {
        try {
          const response = await getTaskById(id);
          const task = response.data; // Assuming response.data contains the task object
          console.log("task details--->", task);
          setForm({
            task_name: task.task_name || "",
            description: task.description || "",
            status: task.status || "",
            assigner: task.assigner?._id || task.assigner || "",
            assignee: task.assignee?._id || task.assignee || "",
            project: task.project?._id || task.assignee || "",
          });
          setExistingAttachments(task.attachments || []);
        } catch (error) {
          console.error("Error fetching task:", error);
          alert("Failed to fetch task details.");
        }
      };
      fetchTask();
    }
  }, [id, isAddMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewAttachments(Array.from(e.target.files));
  };

  const handleRemoveFile = (indexToRemove) => {
    setNewAttachments((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  const validateForm = () => {
    let isValid = true;
    const newError = {
      task_name: "",
      description: "",
      status: "",
      assigner: "",
      assignee: "",
    };

    if (!form.task_name) {
      newError.task_name = "Task title is required.";
      isValid = false;
    }

    if (!form.description) {
      newError.description = "Description is required.";
      isValid = false;
    }

    if (!form.status) {
      newError.status = "Status is required.";
      isValid = false;
    }

    if (!isAddMode &&!form.assigner) {
      newError.assigner = "Assigner is required.";
      isValid = false;
    }

    if (!form.assignee) {
      newError.assignee = "Assignee is required.";
      isValid = false;
    }

    if (!form.project) {
      newError.project = "Project is required.";
      isValid = false;
    }

    setError(newError);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const taskData = {
        task_name: form.task_name,
        description: form.description,
        status: form.status,
        assignee: form.assignee,
        project: form.project,
        attachments: newAttachments.map((file) => ({
          fileName: file.name,
          fileType: file.type,
        })),
      };

      let response;
      if (isAddMode) {
       response = await CreateTask(taskData); // Send JSON data in body
      } else {
        response = await updateTaskById(taskData, id); // Update call with JSON data
      }
      
      const uploadUrls = response.data.uploadUrls;

    // ✅ Upload files using the helper function
    await uploadFilesToS3(newAttachments, uploadUrls);

    alert("Task saved and files uploaded successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Error saving task details:", error);
      alert("Failed to save task details. Please try again.");
    }
  };

  useEffect(() => {
    const fetchUsersAndProjectDetails = async () => {
      try {
        const userResponse = await GetAllUsers();
        const users = userResponse.data; // Assuming response.data contains the list of users
        const projectResponse = await getAllProjects();
        const projects = projectResponse.data;
        setUsers(users);
        setProjects(projects);
      } catch (error) {
        console.error(
          "Error fetching details of user or project:",
          error.message
        );
        alert("Failed to fetch some details.");
      }
    };
    fetchUsersAndProjectDetails();
  }, []);

  return (
    <div className="min-h-screen max-w-screen bg-gray-100 p-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          {isAddMode ? "Add New Task" : "Edit Task Details"}
        </h1>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label
              htmlFor="project"
              className="block text-gray-700 font-medium mb-2"
            >
              Project
            </label>
            <select
              name="project"
              id="project"
              value={form.project}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                !isAddMode
                  ? "bg-gray-200 cursor-not-allowed"
                  : "border-gray-300"
              }`}
              disabled={!isAddMode}
            >
              <option value="">Select Project</option>
              {projects.map((project) => (
                <option key={project._id} value={project._id}>
                  {project.name}
                </option>
              ))}
            </select>
            {error.project && (
              <p className="text-red-500 text-sm">{error.project}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="task_name"
              className="block text-gray-700 font-medium mb-2"
            >
              Task Title
            </label>
            <input
              type="text"
              name="task_name"
              id="task_name"
              value={form.task_name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {error.task_name && (
              <p className="text-red-500 text-sm">{error.task_name}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium mb-2"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={form.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {error.description && (
              <p className="text-red-500 text-sm">{error.description}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="status"
              className="block text-gray-700 font-medium mb-2"
            >
              Status
            </label>
            <select
              name="status"
              id="status"
              value={form.status}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Status</option>
              <option value="todo">To do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            {error.status && (
              <p className="text-red-500 text-sm">{error.status}</p>
            )}
          </div>
          {!isAddMode && (
            <div className="mb-4">
              <label
                htmlFor="assigner"
                className="block text-gray-700 font-medium mb-2"
              >
                Assigner
              </label>
              <select
                name="assigner"
                id="assigner"
                value={form.assigner}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${
                  !isAdmin || !isAddMode
                    ? "bg-gray-200 cursor-not-allowed"
                    : "border-gray-300"
                }`}
                disabled={!isAdmin || !isAddMode} // Disable if not admin
              >
                <option value="">Select Assigner</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.username}
                  </option>
                ))}
              </select>
              {error.assigner && (
                <p className="text-red-500 text-sm">{error.assigner}</p>
              )}
            </div>
          )}
          <div className="mb-4">
            <label
              htmlFor="assignee"
              className="block text-gray-700 font-medium mb-2"
            >
              Assignee
            </label>
            <select
              name="assignee"
              id="assignee"
              value={form.assignee}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                !isAdmin ? "bg-gray-200 cursor-not-allowed" : "border-gray-300"
              }`}
              disabled={!isAdmin} // Make readonly if not admin
            >
              <option value="">Select Assignee</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.username}
                </option>
              ))}
            </select>
            {error.assignee && (
              <p className="text-red-500 text-sm">{error.assignee}</p>
            )}
          </div>
          {!isAddMode && existingAttachments.length > 0 && (
            <div className="mb-4">
              <h3 className="text-gray-700 font-medium mb-2">
                Existing Attachments
              </h3>
              <ul className="list-disc list-inside text-sm text-blue-600">
                {existingAttachments.map((file, index) => (
                  <li key={index}>
                    <a
                      href={file.presignedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {file.fileName || `Attachment ${index + 1}`}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

<div className="mb-6">
      <label
        htmlFor="attachments"
        className="block text-gray-800 font-semibold mb-2"
      >
        Attachments (PDF only)
      </label>
      <input
        type="file"
        id="attachments"
        name="attachments"
        accept="application/pdf"
        multiple
        onChange={handleFileChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
      />

      {newAttachments.length > 0 && (
        <ul className="mt-4 space-y-2 text-sm text-gray-700">
          {newAttachments.map((file, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
            >
              <div className="flex items-center gap-2">
                <FaFilePdf className="text-red-600 w-5 h-5" />
                <span className="truncate max-w-xs">{file.name}</span>
              </div>
              <button
                onClick={() => handleRemoveFile(idx)}
                className="text-gray-400 hover:text-red-600 transition-colors"
                title="Remove file"
              >
                <FaTimes />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              {isAddMode ? "Add Task" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskDetails;
