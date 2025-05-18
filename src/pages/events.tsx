import React, { useState } from 'react';
import { Calendar, Users, Clock, MapPin, DollarSign, FileText } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  attendees: number;
  budget: number;
  status: 'upcoming' | 'ongoing' | 'completed';
}

const Events: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'stats'>('upcoming');
  const [events] = useState<Event[]>([
    {
      id: '1',
      title: 'Pet Adoption Day',
      date: '2024-04-15',
      location: 'Central Park',
      attendees: 45,
      budget: 2500,
      status: 'upcoming'
    },
    {
      id: '2',
      title: 'Vaccination Drive',
      date: '2024-03-20',
      location: 'Community Center',
      attendees: 30,
      budget: 1800,
      status: 'upcoming'
    }
  ]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-display font-bold text-primary-800">Events Management</h1>
          <button className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors">
            Create New Event
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'upcoming'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'past'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Past Events
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'stats'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Event Statistics
            </button>
          </div>

          {activeTab === 'upcoming' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div key={event.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-soft transition-shadow">
                  <h3 className="text-xl font-semibold text-primary-800 mb-4">{event.title}</h3>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-5 h-5 mr-2" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="w-5 h-5 mr-2" />
                      <span>{event.attendees} attendees</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="w-5 h-5 mr-2" />
                      <span>${event.budget}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <button className="px-3 py-1 text-sm bg-primary-100 text-primary-700 rounded hover:bg-primary-200">
                      Edit
                    </button>
                    <button className="px-3 py-1 text-sm bg-primary-500 text-white rounded hover:bg-primary-600">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'past' && (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">No past events available</p>
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-primary-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-primary-800 mb-2">Total Events</h4>
                <p className="text-3xl font-bold text-primary-600">12</p>
              </div>
              <div className="bg-primary-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-primary-800 mb-2">Total Attendees</h4>
                <p className="text-3xl font-bold text-primary-600">450</p>
              </div>
              <div className="bg-primary-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-primary-800 mb-2">Average Attendance</h4>
                <p className="text-3xl font-bold text-primary-600">37.5</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-soft p-6">
          <h2 className="text-xl font-semibold text-primary-800 mb-4">Event Management Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <Users className="w-5 h-5 mr-3 text-primary-500" />
              <span>Manage Volunteers</span>
            </button>
            <button className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <Clock className="w-5 h-5 mr-3 text-primary-500" />
              <span>Attendance Tracking</span>
            </button>
            <button className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <DollarSign className="w-5 h-5 mr-3 text-primary-500" />
              <span>Budget Management</span>
            </button>
            <button className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <FileText className="w-5 h-5 mr-3 text-primary-500" />
              <span>Reports & Analytics</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events; 