import React, { useState } from 'react';
import { Mail, Share2, MessageSquare, FileText, Users, Calendar, Bell, Settings, Send, Search } from 'lucide-react';
import { Card, CardBody, CardHeader } from '../components/common/Card';
import Button from '../components/common/Button';

interface Communication {
  id: string;
  title: string;
  type: 'email' | 'social' | 'newsletter';
  status: 'draft' | 'scheduled' | 'sent';
  date: string;
  audience: string;
  engagement: number;
}

const Communications: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'email' | 'social' | 'newsletter'>('email');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  
  const communications: Communication[] = [
    {
      id: '1',
      title: 'Monthly Newsletter - March 2024',
      type: 'newsletter',
      status: 'scheduled',
      date: '2024-03-15',
      audience: 'All Members',
      engagement: 0
    },
    {
      id: '2',
      title: 'Volunteer Appreciation Event',
      type: 'email',
      status: 'draft',
      date: '2024-03-20',
      audience: 'Volunteers',
      engagement: 0
    }
  ];

  const outreachContacts = [
    {
      name: 'Local Media',
      contacts: 12,
      lastContact: '2024-02-28'
    },
    {
      name: 'Partner Organizations',
      contacts: 8,
      lastContact: '2024-03-01'
    },
    {
      name: 'Community Leaders',
      contacts: 15,
      lastContact: '2024-03-05'
    }
  ];

  const mockMessages = [
    {
      id: 1,
      sender: 'John Doe',
      subject: 'Volunteer Event Update',
      preview: 'Hi team, I wanted to share some updates about the upcoming volunteer event...',
      date: '2024-03-15',
      unread: true,
    },
    {
      id: 2,
      sender: 'Sarah Smith',
      subject: 'Donation Campaign Results',
      preview: 'Great news! Our recent donation campaign exceeded expectations...',
      date: '2024-03-14',
      unread: false,
    },
    // Add more mock messages as needed
  ];

  const filteredMessages = mockMessages.filter(
    (message) =>
      message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Communications</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your messages and communications
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button
            variant="primary"
            icon={<Send className="h-5 w-5" />}
          >
            New Message
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardBody className="p-0">
              <div className="divide-y">
                {filteredMessages.map((message) => (
                  <button
                    key={message.id}
                    className={`w-full text-left p-4 hover:bg-gray-50 ${
                      selectedMessage === message.id ? 'bg-gray-50' : ''
                    }`}
                    onClick={() => setSelectedMessage(message.id)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{message.sender}</span>
                      <span className="text-sm text-gray-500">{message.date}</span>
                    </div>
                    <div className="mt-1">
                      <span className="font-medium">{message.subject}</span>
                      {message.unread && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                          New
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-gray-500 truncate">{message.preview}</p>
                  </button>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {selectedMessage ? (
            <Card>
              <CardBody>
                <div className="prose max-w-none">
                  <h2>Message Content</h2>
                  <p>This is where the full message content would be displayed.</p>
                </div>
              </CardBody>
            </Card>
          ) : (
            <Card>
              <CardBody className="text-center py-10">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100">
                  <MessageSquare className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No message selected</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Select a message from the list to view its contents
                </p>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Communications; 