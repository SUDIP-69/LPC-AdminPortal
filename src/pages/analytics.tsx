import React, { useState } from 'react';
import { Users, Heart, DollarSign, TrendingUp, Calendar, Award, Activity, BarChart2 } from 'lucide-react';

interface Metric {
  id: string;
  title: string;
  value: number;
  change: number;
  icon: React.ElementType;
}

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
  
  const metrics: Metric[] = [
    {
      id: '1',
      title: 'Total Volunteers',
      value: 156,
      change: 12,
      icon: Users
    },
    {
      id: '2',
      title: 'Active Donors',
      value: 89,
      change: 8,
      icon: Heart
    },
    {
      id: '3',
      title: 'Total Donations',
      value: 45600,
      change: 15,
      icon: DollarSign
    },
    {
      id: '4',
      title: 'Community Growth',
      value: 234,
      change: 23,
      icon: TrendingUp
    }
  ];

  const departments = [
    {
      name: 'Animal Care',
      volunteers: 45,
      events: 12,
      impact: 'High'
    },
    {
      name: 'Outreach',
      volunteers: 32,
      events: 8,
      impact: 'Medium'
    },
    {
      name: 'Education',
      volunteers: 28,
      events: 6,
      impact: 'High'
    },
    {
      name: 'Administration',
      volunteers: 15,
      events: 4,
      impact: 'Medium'
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-display font-bold text-primary-800">Analytics Dashboard</h1>
          <div className="flex space-x-2">
            <button
              onClick={() => setTimeRange('week')}
              className={`px-3 py-1 rounded-lg ${
                timeRange === 'week'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setTimeRange('month')}
              className={`px-3 py-1 rounded-lg ${
                timeRange === 'month'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setTimeRange('year')}
              className={`px-3 py-1 rounded-lg ${
                timeRange === 'year'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Year
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric) => (
            <div key={metric.id} className="bg-white rounded-xl shadow-soft p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-primary-50 rounded-lg">
                  <metric.icon className="w-6 h-6 text-primary-500" />
                </div>
                <span className={`text-sm font-medium ${
                  metric.change > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                </span>
              </div>
              <h3 className="text-lg font-semibold text-primary-800 mb-1">{metric.title}</h3>
              <p className="text-2xl font-bold text-gray-900">{metric.value.toLocaleString()}</p>
            </div>
          ))}
        </div>

        {/* Department Performance */}
        <div className="bg-white rounded-xl shadow-soft p-6 mb-8">
          <h2 className="text-xl font-semibold text-primary-800 mb-6">Department Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept) => (
              <div key={dept.name} className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-primary-800 mb-4">{dept.name}</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Users className="w-5 h-5 mr-2" />
                    <span>{dept.volunteers} Volunteers</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-2" />
                    <span>{dept.events} Events</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Activity className="w-5 h-5 mr-2" />
                    <span>Impact: {dept.impact}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Analytics Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-soft p-6">
            <h2 className="text-xl font-semibold text-primary-800 mb-4">Volunteer Engagement</h2>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <BarChart2 className="w-12 h-12 text-gray-400" />
              <span className="ml-2 text-gray-500">Chart will be displayed here</span>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-soft p-6">
            <h2 className="text-xl font-semibold text-primary-800 mb-4">Donation Trends</h2>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-12 h-12 text-gray-400" />
              <span className="ml-2 text-gray-500">Chart will be displayed here</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-soft p-4">
            <h3 className="text-lg font-semibold text-primary-800 mb-2">Certificate Issuance</h3>
            <p className="text-gray-600 mb-4">Track volunteer and donor certificates</p>
            <button className="text-primary-500 hover:text-primary-600">View Details →</button>
          </div>
          <div className="bg-white rounded-xl shadow-soft p-4">
            <h3 className="text-lg font-semibold text-primary-800 mb-2">Event Impact</h3>
            <p className="text-gray-600 mb-4">Measure event success and community impact</p>
            <button className="text-primary-500 hover:text-primary-600">View Details →</button>
          </div>
          <div className="bg-white rounded-xl shadow-soft p-4">
            <h3 className="text-lg font-semibold text-primary-800 mb-2">Resource Utilization</h3>
            <p className="text-gray-600 mb-4">Monitor resource allocation and efficiency</p>
            <button className="text-primary-500 hover:text-primary-600">View Details →</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 