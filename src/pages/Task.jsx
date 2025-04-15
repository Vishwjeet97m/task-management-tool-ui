import React, { useState, useLayoutEffect } from 'react';
import { getAllTasks, updateTaskById } from '../apicalls/tasks.js';

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [columns, setColumns] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  useLayoutEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getAllTasks();
        const tasks = response.data;
        setTasks(tasks);
        setColumns({
          todo: tasks.filter((task) => task.status === 'todo'),
          inProgress: tasks.filter((task) => task.status === 'inProgress'),
          done: tasks.filter((task) => task.status === 'done'),
        });
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleDragStart = (e, task) => {
    e.dataTransfer.setData('task', JSON.stringify(task));
  };

  const handleDrop = async (e, status) => {
    const task = JSON.parse(e.dataTransfer.getData('task'));

    if (task.status !== 'todo' && status === 'todo') {
      console.warn('Tasks cannot be moved back to "todo" once progressed.');
      return;
    }

    try {
      await updateTaskById({ status }, task._id);
      setColumns((prevColumns) => ({
        ...prevColumns,
        [task.status]: prevColumns[task.status].filter((t) => t._id !== task._id),
        [status]: [...prevColumns[status], { ...task, status }],
      }));
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const statusColor = {
    todo: 'bg-gray-100',
    inProgress: 'bg-yellow-100',
    done: 'bg-green-100',
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.keys(columns).map((status) => (
          <div
            key={status}
            className="bg-white rounded-2xl shadow-md flex flex-col max-h-[80vh] overflow-y-auto"
            onDragOver={allowDrop}
            onDrop={(e) => handleDrop(e, status)}
          >
            <div className="sticky top-0 z-10 bg-white p-4 border-b">
              <h2 className="text-xl font-semibold capitalize">{status}</h2>
            </div>

            <div className="p-4 space-y-4">
              {columns[status].map((task) => (
                <div
                  key={task._id}
                  className={`p-4 rounded-xl shadow-sm cursor-move transition hover:shadow-md border ${statusColor[task.status]}`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task)}
                >
                  <h3 className="font-semibold text-base mb-1">{task.task_name}</h3>
                  <p className="text-sm text-gray-700 mb-2">{task.description}</p>
                  <div className="text-xs text-gray-600">
                    {task.assignee ? (
                      <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        Assigned to: {task.assignee.username}
                      </span>
                    ) : (
                      <span className="text-gray-500 italic">Unassigned</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Task;
