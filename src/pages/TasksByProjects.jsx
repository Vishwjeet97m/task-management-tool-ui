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

   return (
      <div className="max-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
         <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center sm:text-left">📋 Tasks by Project</h2>
            <Link
               to={'/tasks/add_task'}
               className="mt-4 sm:mt-0 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm sm:text-base"
            >
               Add Task
            </Link>
         </div>
         {tasks.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">No tasks found for this project.</p>
         ) : (
            tasks.map((task, index) => (
               <div
                  key={task._id}
                  className="bg-white border-l-4 border-blue-500 rounded-2xl shadow-lg mb-5 transition-all duration-300 hover:shadow-xl"
               >
                  <button
                     onClick={() => toggleAccordion(index)}
                     className="w-full flex justify-between items-center p-5 text-left rounded-t-2xl bg-gradient-to-r from-blue-100 to-blue-50 hover:from-blue-200 hover:to-blue-100 transition-colors"
                  >
                     <span className="text-sm sm:text-lg font-semibold text-blue-800">{task.task_name}</span>
                     <span className="text-xl sm:text-2xl font-bold text-blue-600">{openIndex === index ? '−' : '+'}</span>
                  </button>
                  {openIndex === index && (
                     <div className="px-4 sm:px-6 py-4 bg-white rounded-b-2xl border-t border-gray-200">
                        <p className="mb-2 text-sm sm:text-base">
                           <strong className="text-gray-700">📝 Description:</strong> {task.description}
                        </p>
                        <p className="mb-2 text-sm sm:text-base">
                           <strong className="text-gray-700">📌 Status:</strong> <span className="capitalize">{task.status}</span>
                        </p>
                        <p className="mb-2 text-sm sm:text-base">
                           <strong className="text-gray-700">👤 Assigned To:</strong> {task.assignee?.username || 'N/A'}
                        </p>
                        <p className="mb-2 text-sm sm:text-base">
                           <strong className="text-gray-700">👤 Assigned By:</strong> {task.assigner?.username || 'N/A'}
                        </p>
                        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 mt-4">
                           <button
                              onClick={() => handleEdit(task._id)}
                              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm sm:text-base"
                           >
                              Edit
                           </button>
                           <button
                              onClick={() => handleDelete(task._id)}
                              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm sm:text-base"
                           >
                              Delete
                           </button>
                        </div>
                     </div>
                  )}
               </div>
            ))
         )}
      </div>
   );
};

export default TasksByProject;
