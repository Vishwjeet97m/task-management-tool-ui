import { useEffect, useState } from "react";
import { getTasksByProject, deleteTask } from "../apicalls/tasks";
import { useParams, useNavigate, Link } from "react-router-dom";

const TasksByProject = () => {
   const [tasks, setTasks] = useState([]);
   const { id } = useParams();
   const [openIndex, setOpenIndex] = useState(null);
   const navigate = useNavigate();

   useEffect(() => {
      if (!id) return;
      const fetchTasks = async () => {
         try {
            const response = await getTasksByProject(id);
            setTasks(response.data || []);
            console.log("response data--->", response.data);
         } catch (error) {
            console.error("Error fetching tasks by project:", error);
         }
      };

      fetchTasks();
   }, [id]);

   const toggleAccordion = (index) => {
      setOpenIndex(openIndex === index ? null : index);
   };

   const handleEdit = (taskId) => {
      navigate(`/tasks/${taskId}`);
   };

   const handleDelete = async (taskId) => {
      try {
         await deleteTask(taskId);
         setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      } catch (error) {
         console.error("Error deleting task:", error);
      }
   };

   // Helper function to get status badge color
   const getStatusColor = (status) => {
      switch (status?.toLowerCase()) {
         case "completed":
            return "bg-green-100 text-green-800 border-green-200";
         case "in progress":
            return "bg-blue-100 text-blue-800 border-blue-200";
         case "pending":
            return "bg-yellow-100 text-yellow-800 border-yellow-200";
         case "cancelled":
            return "bg-red-100 text-red-800 border-red-200";
         default:
            return "bg-gray-100 text-gray-800 border-gray-200";
      }
   };

   return (
      <div className="max-w-5xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
         {/* Header with gradient background */}
         <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-lg mb-8 p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center">
               <div className="flex items-center mb-4 sm:mb-0">
                  <div className="bg-white/20 p-3 rounded-full mr-4">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                     </svg>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">Project Tasks</h2>
               </div>
               <Link
                  to={'/tasks/add_task'}
                  className="flex items-center bg-white hover:bg-blue-50 text-blue-700 px-5 py-3 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg"
               >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add New Task
               </Link>
            </div>
         </div>

         {/* Task Count */}
         <div className="mb-6 text-center sm:text-left">
            <span className="inline-block bg-blue-50 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
               {tasks.length} {tasks.length === 1 ? 'Task' : 'Tasks'} Found
            </span>
         </div>

         {/* Tasks List */}
         {tasks.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-10 text-center">
               <div className="flex flex-col items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <p className="text-gray-500 text-lg mb-6">No tasks found for this project</p>
                  <Link
                     to={'/tasks/add_task'}
                     className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200"
                  >
                     Create your first task
                  </Link>
               </div>
            </div>
         ) : (
            <div className="grid gap-5">
               {tasks.map((task, index) => (
                  <div
                     key={task._id}
                     className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg"
                  >
                     <button
                        onClick={() => toggleAccordion(index)}
                        className="w-full flex justify-between items-center p-5 text-left transition-colors"
                     >
                        <div className="flex items-center space-x-4">
                           <span className={`flex items-center justify-center h-10 w-10 rounded-full ${openIndex === index ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                              {openIndex === index ? (
                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                 </svg>
                              ) : (
                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                 </svg>
                              )}
                           </span>
                           <div>
                              <h3 className="font-semibold text-gray-800 text-lg">{task.task_name}</h3>
                              <div className="flex items-center mt-1">
                                 <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                                    {task.status || 'No Status'}
                                 </span>
                              </div>
                           </div>
                        </div>
                        <div className="flex items-center">
                           <span className="hidden sm:block text-sm text-gray-500 mr-4">
                              {task.assignee?.username ? `Assigned to ${task.assignee.username}` : 'Unassigned'}
                           </span>
                        </div>
                     </button>

                     {openIndex === index && (
                        <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                 <h4 className="text-sm font-medium text-gray-500 mb-2">Description</h4>
                                 <p className="text-gray-700">{task.description || 'No description provided'}</p>
                              </div>
                              
                              <div className="space-y-4">
                                 <div>
                                    <h4 className="text-sm font-medium text-gray-500 mb-2">Task Details</h4>
                                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                          <div>
                                             <p className="text-xs text-gray-500">Assigned To</p>
                                             <p className="font-medium">{task.assignee?.username || 'Unassigned'}</p>
                                          </div>
                                          <div>
                                             <p className="text-xs text-gray-500">Assigned By</p>
                                             <p className="font-medium">{task.assigner?.username || 'Not specified'}</p>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 
                                 <div className="flex justify-end space-x-3">
                                    <button
                                       onClick={() => handleEdit(task._id)}
                                       className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                    >
                                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                       </svg>
                                       Edit
                                    </button>
                                    <button
                                       onClick={() => handleDelete(task._id)}
                                       className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                                    >
                                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                       </svg>
                                       Delete
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </div>
                     )}
                  </div>
               ))}
            </div>
         )}
      </div>
   );
};

export default TasksByProject;