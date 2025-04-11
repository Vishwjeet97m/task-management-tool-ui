import React, { useState, useEffect } from 'react';
import { getAllTasks, updateTaskById } from '../apicalls/tasks.js'; // Assuming these API calls exist

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [columns, setColumns] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  useEffect(() => {
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

  return (
    <div className="min-h-screen max-w-screen bg-gray-100 p-8">
      <div className="grid grid-cols-3 gap-4">
        {Object.keys(columns).map((status) => (
          <div
            key={status}
            className="bg-white rounded-lg shadow-lg p-4"
            onDragOver={allowDrop}
            onDrop={(e) => handleDrop(e, status)}
          >
            <h2 className="text-xl font-bold mb-4 capitalize">{status}</h2>
            {columns[status].map((task) => (
              <div
                key={task._id}
                className={`p-4 rounded mb-2 cursor-pointer ${
                  task.status === 'inProgress'
                    ? 'bg-yellow-200'
                    : task.status === 'done'
                    ? 'bg-green-200'
                    : 'bg-gray-200'
                }`}
                draggable
                onDragStart={(e) => handleDragStart(e, task)}
              >
                <h3 className="font-bold">{task.task_name}</h3>
                <p>{task.description}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Task;
