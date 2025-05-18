import React, { useState } from 'react';
import { Target, Users, Award, Activity, Calendar, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  department: string;
  progress: number;
  status: 'on-track' | 'at-risk' | 'completed';
  startDate: string;
  endDate: string;
  team: number;
}

interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
  status: 'on-track' | 'at-risk' | 'completed';
}

const ProgressTracker: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'projects' | 'goals' | 'impact'>('projects');
  
  const projects: Project[] = [
    {
      id: '1',
      name: 'Community Outreach Program',
      department: 'Outreach',
      progress: 75,
      status: 'on-track',
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      team: 8
    },
    {
      id: '2',
      name: 'Animal Care Training',
      department: 'Education',
      progress: 45,
      status: 'at-risk',
      startDate: '2024-02-01',
      endDate: '2024-05-31',
      team: 5
    }
  ];

  const goals: Goal[] = [
    {
      id: '1',
      title: 'Volunteer Recruitment',
      target: 200,
      current: 156,
      unit: 'volunteers',
      deadline: '2024-12-31',
      status: 'on-track'
    },
    {
      id: '2',
      title: 'Community Education Sessions',
      target: 50,
      current: 25,
      unit: 'sessions',
      deadline: '2024-12-31',
      status: 'at-risk'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track':
        return 'bg-green-100 text-green-800';
      case 'at-risk':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-display font-bold text-primary-800">Progress Tracker</h1>
          <button className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Add New Project
          </button>
        </div>

        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'projects'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab('goals')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'goals'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Goals
          </button>
          <button
            onClick={() => setActiveTab('impact')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'impact'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Impact Metrics
          </button>
        </div>

        {activeTab === 'projects' && (
          <div className="space-y-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-xl shadow-soft p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-primary-800">{project.name}</h3>
                    <p className="text-gray-600">{project.department}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-500 h-2 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{project.startDate} - {project.endDate}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{project.team} team members</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Activity className="w-4 h-4 mr-2" />
                    <span>View Details</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'goals' && (
          <div className="space-y-6">
            {goals.map((goal) => (
              <div key={goal.id} className="bg-white rounded-xl shadow-soft p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-primary-800">{goal.title}</h3>
                    <p className="text-gray-600">Target: {goal.target} {goal.unit}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(goal.status)}`}>
                    {goal.status}
                  </span>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{Math.round((goal.current / goal.target) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-500 h-2 rounded-full"
                      style={{ width: `${(goal.current / goal.target) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Deadline: {goal.deadline}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    <span>Current: {goal.current} {goal.unit}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'impact' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h3 className="text-lg font-semibold text-primary-800 mb-4">Community Impact</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Animals Helped</span>
                  <span className="font-semibold">1,234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Communities Reached</span>
                  <span className="font-semibold">45</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Education Hours</span>
                  <span className="font-semibold">2,500</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h3 className="text-lg font-semibold text-primary-800 mb-4">Volunteer Impact</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Hours</span>
                  <span className="font-semibold">5,678</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Active Volunteers</span>
                  <span className="font-semibold">156</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Training Completed</span>
                  <span className="font-semibold">89</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h3 className="text-lg font-semibold text-primary-800 mb-4">Resource Impact</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Donations Received</span>
                  <span className="font-semibold">$45,600</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Resources Distributed</span>
                  <span className="font-semibold">2,345</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Partnerships</span>
                  <span className="font-semibold">12</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-soft p-4">
            <h3 className="text-lg font-semibold text-primary-800 mb-2">Certificate Management</h3>
            <p className="text-gray-600 mb-4">Track and manage volunteer certificates</p>
            <button className="text-primary-500 hover:text-primary-600">View Certificates →</button>
          </div>
          <div className="bg-white rounded-xl shadow-soft p-4">
            <h3 className="text-lg font-semibold text-primary-800 mb-2">Resource Allocation</h3>
            <p className="text-gray-600 mb-4">Monitor resource distribution</p>
            <button className="text-primary-500 hover:text-primary-600">View Resources →</button>
          </div>
          <div className="bg-white rounded-xl shadow-soft p-4">
            <h3 className="text-lg font-semibold text-primary-800 mb-2">Impact Reports</h3>
            <p className="text-gray-600 mb-4">Generate detailed impact reports</p>
            <button className="text-primary-500 hover:text-primary-600">View Reports →</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker; 