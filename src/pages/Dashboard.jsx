import React from 'react'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'
import { Users, FolderKanban, CalendarClock } from 'lucide-react'

const Dashboard = () => {
  const projectCount = 8
  const teamMemberCount = 24

  const taskStatusData = [
    { name: 'To Do', value: 12 },
    { name: 'In Progress', value: 8 },
    { name: 'Done', value: 20 },
  ]

  const COLORS = ['#FF8042', '#0088FE', '#00C49F']

  const upcomingDeadlines = [
    { title: 'Design Homepage', date: '2025-04-12' },
    { title: 'Deploy Backend API', date: '2025-04-14' },
    { title: 'QA Testing Sprint', date: '2025-04-15' },
  ]

  return (
    <div className="p-4 sm:p-6 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Project Count */}
      <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 flex items-center space-x-4">
        <FolderKanban className="text-blue-600 flex-shrink-0" size={32} />
        <div>
          <p className="text-gray-500 text-sm sm:text-base">Total Projects</p>
          <h2 className="text-xl sm:text-2xl font-bold">{projectCount}</h2>
        </div>
      </div>

      {/* Team Member Count */}
      <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 flex items-center space-x-4">
        <Users className="text-green-600 flex-shrink-0" size={32} />
        <div>
          <p className="text-gray-500 text-sm sm:text-base">Team Members</p>
          <h2 className="text-xl sm:text-2xl font-bold">{teamMemberCount}</h2>
        </div>
      </div>

      {/* Task Status Pie Chart */}
      <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 col-span-1 md:col-span-2 lg:col-span-1">
        <h3 className="text-base sm:text-lg font-semibold mb-4">Task Status</h3>
        <div className="w-full h-48 sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={taskStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius="80%"
                dataKey="value"
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              >
                {taskStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 col-span-1 md:col-span-2">
        <div className="flex items-center mb-4">
          <CalendarClock className="text-purple-600 mr-2 flex-shrink-0" />
          <h3 className="text-base sm:text-lg font-semibold">Upcoming Deadlines</h3>
        </div>
        <ul className="space-y-2">
          {upcomingDeadlines.map((item, idx) => (
            <li key={idx} className="flex justify-between text-sm sm:text-base">
              <span>{item.title}</span>
              <span className="text-gray-500">{item.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Dashboard
