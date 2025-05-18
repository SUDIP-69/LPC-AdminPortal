import { useState } from 'react';
import { PencilLine, Plus, Search, Trash2, Heart, Calendar, DollarSign } from 'lucide-react';
import { Card, CardBody, CardHeader } from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { mockDonors } from '../data/mockData';

function Donors() {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Donors</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage donor information and track donations
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button
            variant="primary"
            icon={<Plus className="h-5 w-5" />}
          >
            Add Donor
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardBody className="flex items-center">
            <div className="p-3 rounded-lg bg-primary-100">
              <Heart className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Total Donors</p>
              <p className="mt-1 text-xl font-semibold text-gray-900">{mockDonors.length}</p>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="flex items-center">
            <div className="p-3 rounded-lg bg-success-100">
              <DollarSign className="h-6 w-6 text-success-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Total Donations</p>
              <p className="mt-1 text-xl font-semibold text-gray-900">
                ${mockDonors.reduce((acc, donor) => acc + donor.totalDonated, 0).toLocaleString()}
              </p>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="flex items-center">
            <div className="p-3 rounded-lg bg-accent-100">
              <Calendar className="h-6 w-6 text-accent-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Last Donation</p>
              <p className="mt-1 text-xl font-semibold text-gray-900">
                {new Date(Math.max(...mockDonors.map(d => new Date(d.lastDonation).getTime()))).toLocaleDateString()}
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
      
      <Card>
        <CardHeader 
          title="Donor List" 
          description="View and manage donor information"
        />
        <CardBody>
          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative max-w-md w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Search donors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <select
                  className="block w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-sm"
                  defaultValue=""
                >
                  <option value="">All Types</option>
                  <option value="individual">Individual</option>
                  <option value="corporate">Corporate</option>
                </select>
                
                <select
                  className="block w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-sm"
                  defaultValue=""
                >
                  <option value="">All Frequencies</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="one-time">One-time</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Donor
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Donated
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Donation
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Frequency
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockDonors.map((donor) => (
                  <tr key={donor.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                            <span className="text-primary-600 font-medium text-lg">
                              {donor.name.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{donor.name}</div>
                          <div className="text-sm text-gray-500">{donor.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge 
                        variant={donor.type === 'corporate' ? 'primary' : 'secondary'}
                        size="sm"
                      >
                        {donor.type.charAt(0).toUpperCase() + donor.type.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${donor.totalDonated.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(donor.lastDonation).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge 
                        variant={
                          donor.frequency === 'monthly' ? 'success' :
                          donor.frequency === 'quarterly' ? 'warning' :
                          'gray'
                        }
                        size="sm"
                      >
                        {donor.frequency.charAt(0).toUpperCase() + donor.frequency.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-primary-600 hover:text-primary-900 mr-3">
                        <PencilLine className="h-5 w-5" />
                      </button>
                      <button className="text-error-600 hover:text-error-900">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{mockDonors.length}</span> of <span className="font-medium">{mockDonors.length}</span> donors
            </div>
            <div className="flex-1 flex justify-end">
              <button
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 mr-3"
                disabled
              >
                Previous
              </button>
              <button
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                disabled
              >
                Next
              </button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Donors;