import React, { useState } from 'react';
import { Calendar, FileText, Image, Video, Share2, Users, Settings, Plus, CheckSquare, List, Trello, Tag, Filter, Search, Clock, BarChart2, MessageSquare, Bell } from 'lucide-react';

interface Content {
  id: string;
  title: string;
  type: 'post' | 'article' | 'media' | 'event';
  status: 'draft' | 'scheduled' | 'published';
  publishDate: string;
  platform: string;
  author: string;
  priority: 'low' | 'medium' | 'high';
  tags: string[];
  assignedTo: string[];
  comments: number;
  views: number;
}

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  assignedTo: string;
}

interface KanbanColumn {
  id: string;
  title: string;
  items: Content[];
}

const ContentCalendar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'calendar' | 'content' | 'media' | 'kanban' | 'todo'>('calendar');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: '2024-03-01',
    end: '2024-03-31'
  });
  
  const content: Content[] = [
    {
      id: '1',
      title: 'Monthly Newsletter - March 2024',
      type: 'article',
      status: 'scheduled',
      publishDate: '2024-03-15',
      platform: 'Website',
      author: 'John Doe',
      priority: 'high',
      tags: ['newsletter', 'monthly'],
      assignedTo: ['John Doe', 'Jane Smith'],
      comments: 5,
      views: 120
    },
    {
      id: '2',
      title: 'Volunteer Success Story',
      type: 'post',
      status: 'draft',
      publishDate: '2024-03-20',
      platform: 'Social Media',
      author: 'Jane Smith',
      priority: 'medium',
      tags: ['volunteer', 'story'],
      assignedTo: ['Jane Smith'],
      comments: 2,
      views: 45
    }
  ];

  const todos: Todo[] = [
    {
      id: '1',
      title: 'Review March newsletter content',
      completed: false,
      dueDate: '2024-03-10',
      priority: 'high',
      assignedTo: 'John Doe'
    },
    {
      id: '2',
      title: 'Schedule social media posts',
      completed: true,
      dueDate: '2024-03-08',
      priority: 'medium',
      assignedTo: 'Jane Smith'
    }
  ];

  const kanbanColumns: KanbanColumn[] = [
    {
      id: 'draft',
      title: 'Draft',
      items: content.filter(item => item.status === 'draft')
    },
    {
      id: 'scheduled',
      title: 'Scheduled',
      items: content.filter(item => item.status === 'scheduled')
    },
    {
      id: 'published',
      title: 'Published',
      items: content.filter(item => item.status === 'published')
    }
  ];

  const mediaAssets = [
    {
      type: 'image',
      count: 156,
      recent: '2024-03-01'
    },
    {
      type: 'video',
      count: 45,
      recent: '2024-03-05'
    },
    {
      type: 'document',
      count: 89,
      recent: '2024-03-10'
    }
  ];

  const tags = ['newsletter', 'social', 'event', 'story', 'volunteer', 'impact'];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-display font-bold text-primary-800">Content Calendar</h1>
          <div className="flex space-x-4">
            <button className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Create Content
            </button>
            <button className="bg-white text-primary-500 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center border border-primary-500">
              <Bell className="w-5 h-5 mr-2" />
              Notifications
            </button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-soft p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search content..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
              <button className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Date Range
              </button>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTags(prev => 
                  prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                )}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedTags.includes(tag)
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'calendar'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Calendar View
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'content'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Content List
          </button>
          <button
            onClick={() => setActiveTab('kanban')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'kanban'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Kanban Board
          </button>
          <button
            onClick={() => setActiveTab('todo')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'todo'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            To-Do List
          </button>
          <button
            onClick={() => setActiveTab('media')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'media'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Media Assets
          </button>
        </div>

        {activeTab === 'calendar' && (
          <div className="bg-white rounded-xl shadow-soft p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-primary-800">March 2024</h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded hover:bg-gray-200">
                  Previous
                </button>
                <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded hover:bg-gray-200">
                  Next
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center font-medium text-gray-600 py-2">
                  {day}
                </div>
              ))}
              {Array.from({ length: 31 }, (_, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-2 min-h-[100px]">
                  <div className="text-sm text-gray-600 mb-2">{i + 1}</div>
                  {content.filter(c => new Date(c.publishDate).getDate() === i + 1).map(c => (
                    <div key={c.id} className="text-xs bg-primary-50 text-primary-700 p-1 rounded mb-1">
                      {c.title}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-6">
            {content.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-soft p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-primary-50 rounded-lg">
                      {item.type === 'post' ? (
                        <Share2 className="w-6 h-6 text-primary-500" />
                      ) : item.type === 'article' ? (
                        <FileText className="w-6 h-6 text-primary-500" />
                      ) : (
                        <Calendar className="w-6 h-6 text-primary-500" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-primary-800">{item.title}</h3>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                        <span>{item.platform}</span>
                        <span>•</span>
                        <span>By {item.author}</span>
                        <span>•</span>
                        <span>{item.publishDate}</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        {item.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.status === 'published' ? 'bg-green-100 text-green-800' :
                      item.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.status}
                    </span>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <Settings className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      {item.comments} comments
                    </span>
                    <span className="flex items-center">
                      <BarChart2 className="w-4 h-4 mr-1" />
                      {item.views} views
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {item.assignedTo.map(user => (
                      <span key={user} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                        {user}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'kanban' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {kanbanColumns.map(column => (
              <div key={column.id} className="bg-white rounded-xl shadow-soft p-4">
                <h3 className="text-lg font-semibold text-primary-800 mb-4">{column.title}</h3>
                <div className="space-y-4">
                  {column.items.map(item => (
                    <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-primary-800">{item.title}</h4>
                      <div className="mt-2 flex items-center justify-between text-sm">
                        <span className="text-gray-600">{item.platform}</span>
                        <span className="text-gray-600">{item.publishDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'todo' && (
          <div className="bg-white rounded-xl shadow-soft p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-primary-800">To-Do List</h2>
              <button className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Add Task
              </button>
            </div>
            <div className="space-y-4">
              {todos.map(todo => (
                <div key={todo.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      className="w-5 h-5 text-primary-500 rounded border-gray-300 focus:ring-primary-500"
                    />
                    <div>
                      <h4 className={`font-medium ${todo.completed ? 'text-gray-400 line-through' : 'text-primary-800'}`}>
                        {todo.title}
                      </h4>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                        <span>Due: {todo.dueDate}</span>
                        <span>•</span>
                        <span>Assigned to: {todo.assignedTo}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    todo.priority === 'high' ? 'bg-red-100 text-red-800' :
                    todo.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {todo.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'media' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mediaAssets.map((asset) => (
              <div key={asset.type} className="bg-white rounded-xl shadow-soft p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-2 bg-primary-50 rounded-lg">
                    {asset.type === 'image' ? (
                      <Image className="w-6 h-6 text-primary-500" />
                    ) : asset.type === 'video' ? (
                      <Video className="w-6 h-6 text-primary-500" />
                    ) : (
                      <FileText className="w-6 h-6 text-primary-500" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-primary-800 capitalize">{asset.type}s</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Files</span>
                    <span className="font-medium">{asset.count}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Last Updated</span>
                    <span className="font-medium">{asset.recent}</span>
                  </div>
                </div>
                <button className="mt-4 w-full px-4 py-2 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors">
                  View {asset.type}s
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-soft p-4">
            <h3 className="text-lg font-semibold text-primary-800 mb-2">Content Templates</h3>
            <p className="text-gray-600 mb-4">Access and manage content templates</p>
            <button className="text-primary-500 hover:text-primary-600">View Templates →</button>
          </div>
          <div className="bg-white rounded-xl shadow-soft p-4">
            <h3 className="text-lg font-semibold text-primary-800 mb-2">Audience Insights</h3>
            <p className="text-gray-600 mb-4">View content performance metrics</p>
            <button className="text-primary-500 hover:text-primary-600">View Insights →</button>
          </div>
          <div className="bg-white rounded-xl shadow-soft p-4">
            <h3 className="text-lg font-semibold text-primary-800 mb-2">Collaboration</h3>
            <p className="text-gray-600 mb-4">Manage team collaboration</p>
            <button className="text-primary-500 hover:text-primary-600">View Team →</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCalendar; 