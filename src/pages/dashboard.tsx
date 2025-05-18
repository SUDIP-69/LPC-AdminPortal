import React from 'react';
import { Users, Heart, DollarSign, Calendar } from 'lucide-react';
import { Card, CardBody, CardHeader } from '../components/common/Card';
import { mockDashboardStats } from '../data/mockData';

const statCards = [
  {
    title: 'Communities',
    value: mockDashboardStats.totalCommunities,
    icon: <Users className="h-6 w-6 text-primary-600" />,
  },
  {
    title: 'Volunteers',
    value: mockDashboardStats.totalVolunteers,
    icon: <Heart className="h-6 w-6 text-primary-600" />,
  },
  {
    title: 'Donors',
    value: mockDashboardStats.totalDonors,
    icon: <DollarSign className="h-6 w-6 text-primary-600" />,
  },
  {
    title: 'Upcoming Events',
    value: mockDashboardStats.upcomingEvents,
    icon: <Calendar className="h-6 w-6 text-primary-600" />,
  },
];

export default function Dashboard() {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome to your NGO admin dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card
            key={stat.title}
            className="animate-slide-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardBody>
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-primary-50">
                  {stat.icon}
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Recent Donations</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-2">
              <p className="text-sm text-gray-700">Recent Donations: <span className="font-semibold">${mockDashboardStats.recentDonations.toLocaleString()}</span></p>
              <p className="text-sm text-gray-700">Volunteer Hours: <span className="font-semibold">{mockDashboardStats.volunteerHours}</span></p>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Documents</h2>
          </CardHeader>
          <CardBody>
            <p className="text-sm text-gray-700">Total Documents: <span className="font-semibold">{mockDashboardStats.documentCount}</span></p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}