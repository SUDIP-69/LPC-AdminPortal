import React, { useState } from 'react';
import { FileText, Upload, Folder, Shield, Award, Users, FileCheck, FileX } from 'lucide-react';

interface Document {
  id: string;
  title: string;
  type: 'report' | 'policy' | 'form' | 'certificate';
  category: string;
  uploadDate: string;
  status: 'approved' | 'pending' | 'rejected';
  uploadedBy: string;
}

const Documents: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [documents] = useState<Document[]>([
    {
      id: '1',
      title: 'Annual Report 2023',
      type: 'report',
      category: 'Reports',
      uploadDate: '2024-02-15',
      status: 'approved',
      uploadedBy: 'John Doe'
    },
    {
      id: '2',
      title: 'Volunteer Policy',
      type: 'policy',
      category: 'Policies',
      uploadDate: '2024-03-01',
      status: 'pending',
      uploadedBy: 'Jane Smith'
    }
  ]);

  const categories = [
    { id: 'all', name: 'All Documents', icon: FileText },
    { id: 'reports', name: 'Reports', icon: FileText },
    { id: 'policies', name: 'Policies', icon: Shield },
    { id: 'forms', name: 'Forms', icon: FileCheck },
    { id: 'certificates', name: 'Certificates', icon: Award }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-display font-bold text-primary-800">Document Management</h1>
          <button className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center">
            <Upload className="w-5 h-5 mr-2" />
            Upload Document
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-soft p-4">
              <h2 className="text-lg font-semibold text-primary-800 mb-4">Categories</h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                      activeCategory === category.id
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <category.icon className="w-5 h-5 mr-3" />
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-soft p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-primary-800">Documents</h2>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded hover:bg-gray-200">
                    Sort by Date
                  </button>
                  <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded hover:bg-gray-200">
                    Filter
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-soft transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-primary-50 rounded-lg">
                          <FileText className="w-6 h-6 text-primary-500" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-primary-800">{doc.title}</h3>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                            <span>{doc.category}</span>
                            <span>•</span>
                            <span>Uploaded by {doc.uploadedBy}</span>
                            <span>•</span>
                            <span>{doc.uploadDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(doc.status)}`}>
                          {doc.status}
                        </span>
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <FileX className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl shadow-soft p-4">
                <h3 className="text-lg font-semibold text-primary-800 mb-2">Certificate Management</h3>
                <p className="text-gray-600 mb-4">Manage volunteer and donor certificates</p>
                <button className="text-primary-500 hover:text-primary-600">View Certificates →</button>
              </div>
              <div className="bg-white rounded-xl shadow-soft p-4">
                <h3 className="text-lg font-semibold text-primary-800 mb-2">Media Assets</h3>
                <p className="text-gray-600 mb-4">Access and manage media files</p>
                <button className="text-primary-500 hover:text-primary-600">View Media →</button>
              </div>
              <div className="bg-white rounded-xl shadow-soft p-4">
                <h3 className="text-lg font-semibold text-primary-800 mb-2">Access Control</h3>
                <p className="text-gray-600 mb-4">Manage document access permissions</p>
                <button className="text-primary-500 hover:text-primary-600">Manage Access →</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents; 