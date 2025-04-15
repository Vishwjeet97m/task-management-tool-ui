import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Users, FolderKanban, CalendarClock, Activity, BarChart3, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { getAllProjects } from "../apicalls/projects";
import { GetAllUsers } from "../apicalls/users";
import { getAllTasks } from "../apicalls/tasks";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [projectCount, setProjectCount] = useState(null);
  const [teamMemberCount, setTeamMemberCount] = useState(null);
  const [taskStatusData, setTaskStatusData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const COLORS = ["#FF8042", "#0088FE", "#00C49F"];
  const STATUS_COLORS = {
    "To Do": "#FF8042",
    "In Progress": "#0088FE",
    "Done": "#00C49F"
  };

  const upcomingDeadlines = [
    { title: "Design Homepage", date: "2025-04-12" },
    { title: "Deploy Backend API", date: "2025-04-14" },
    { title: "QA Testing Sprint", date: "2025-04-15" },
  ];

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      try {
        const projectResponse = await getAllProjects();
        const projectList = projectResponse?.data || [];
        if (projectList.length) {
          setProjectCount(projectList.length);
        }

        const userResponse = await GetAllUsers();
        const userList = userResponse?.data || [];
        if (userList.length) {
          setTeamMemberCount(userList.length);
        }

        const taskResponse = await getAllTasks();
        const taskList = taskResponse?.data || [];
        if (taskList.length) {
          const todoCount = taskList.filter(
            (task) => task.status === "todo"
          ).length;
          const inProgressCount = taskList.filter(
            (task) => task.status === "inProgress"
          ).length;
          const doneCount = taskList.filter(
            (task) => task.status === "done"
          ).length;

          setTaskStatusData([
            { name: "To Do", value: todoCount },
            { name: "In Progress", value: inProgressCount },
            { name: "Done", value: doneCount },
          ]);
        }

        console.log("Projects:", projectList);
        console.log("Users:", userList);
        console.log("Tasks:", taskList);
      } catch (error) {
        console.log("Failed to fetch details:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, []);

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Custom loader component
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Dashboard Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <div className="flex items-center text-gray-500">
          <Activity size={18} className="mr-2" />
          <span>Project overview and analytics</span>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* Project Count Card */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-500 p-3 rounded-xl">
                <FolderKanban className="text-white" size={24} />
              </div>
              <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">Projects</span>
            </div>
            <div className="mb-2">
              {isLoading ? (
                <div className="h-10 bg-blue-100 rounded animate-pulse"></div>
              ) : (
                <h2 className="text-3xl font-bold text-gray-800">{projectCount || 0}</h2>
              )}
              <p className="text-gray-500 text-sm">Total Projects</p>
            </div>
            <div className="mt-6">
              <a 
                href="/projects" 
                className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                View All Projects
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Team Member Count Card */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-500 p-3 rounded-xl">
                <Users className="text-white" size={24} />
              </div>
              <span className="bg-green-100 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full">Team</span>
            </div>
            <div className="mb-2">
              {isLoading ? (
                <div className="h-10 bg-green-100 rounded animate-pulse"></div>
              ) : (
                <h2 className="text-3xl font-bold text-gray-800">{teamMemberCount || 0}</h2>
              )}
              <p className="text-gray-500 text-sm">Team Members</p>
            </div>
            <div className="mt-6">
              <a 
                href="/users" 
                className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-800"
              >
                View All Members
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Task Summary Card */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-500 p-3 rounded-xl">
                <CheckCircle className="text-white" size={24} />
              </div>
              <span className="bg-purple-100 text-purple-700 text-xs font-medium px-2.5 py-1 rounded-full">Tasks</span>
            </div>
            <div className="mb-2">
              {isLoading ? (
                <div className="h-10 bg-purple-100 rounded animate-pulse"></div>
              ) : (
                <h2 className="text-3xl font-bold text-gray-800">
                  {taskStatusData.reduce((sum, item) => sum + item.value, 0) || 0}
                </h2>
              )}
              <p className="text-gray-500 text-sm">Total Tasks</p>
            </div>
            <div className="mt-6">
              <a 
                href="/tasks" 
                className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-800"
              >
                View All Tasks
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Data Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Task Status Pie Chart */}
        <div className="bg-white rounded-2xl shadow-md p-6 lg:col-span-1">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Task Status Distribution</h3>
            <BarChart3 size={20} className="text-gray-400" />
          </div>

          {isLoading ? (
            <LoadingSpinner />
          ) : taskStatusData.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie    
                    onClick={()=>navigate("/tasks")}   
                    data={taskStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius="80%"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {taskStatusData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} Tasks`, null]} />
                  <Legend 
                    layout="horizontal" 
                    verticalAlign="bottom"
                    align="center"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <AlertCircle size={48} className="mb-2" />
              <p>No task data available</p>
            </div>
          )}

          {/* Add status legend markers below chart */}
          <div className="grid grid-cols-3 gap-2 mt-6">
            {taskStatusData.map((item, index) => (
              <div key={`status-${index}`} className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center w-8 h-8 rounded-full mb-1" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}>
                  <span className="text-white text-xs font-bold">{item.value}</span>
                </div>
                <span className="text-xs font-medium text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Deadlines Table */}
        <div className="bg-white rounded-2xl shadow-md p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Upcoming Deadlines</h3>
            <CalendarClock size={20} className="text-gray-400" />
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Task
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {upcomingDeadlines.map((deadline, index) => {
                  // Calculate days left
                  const dueDate = new Date(deadline.date);
                  const today = new Date();
                  const daysLeft = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
                  
                  let statusColor = "bg-green-100 text-green-800";
                  let statusText = "On Track";
                  
                  if (daysLeft < 0) {
                    statusColor = "bg-red-100 text-red-800";
                    statusText = "Overdue";
                  } else if (daysLeft <= 2) {
                    statusColor = "bg-amber-100 text-amber-800";
                    statusText = "Due Soon";
                  }
                  
                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-md bg-blue-100 text-blue-600">
                            <span className="text-xs font-medium">{index + 1}</span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{deadline.title}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(deadline.date)}</div>
                        <div className="text-xs text-gray-500">
                          {daysLeft === 0 ? "Today" : 
                           daysLeft < 0 ? `${Math.abs(daysLeft)} days ago` : 
                           `${daysLeft} days left`}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor}`}>
                          {statusText}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 text-right">
            <a 
              href="/tasks" 
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              View All Tasks
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;