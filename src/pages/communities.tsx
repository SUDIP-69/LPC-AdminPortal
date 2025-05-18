import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Building2, Plus, Search, Users } from 'lucide-react';
import { Card, CardBody, CardHeader } from '../components/common/Card';
import Button from '../components/common/Button';
import { mockCommunities } from '../data/mockData';

function Communities() {
  const [communities, setCommunities] = useState(mockCommunities);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    if (searchQuery) {
      const filtered = mockCommunities.filter(community => 
        community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        community.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setCommunities(filtered);
    } else {
      setCommunities(mockCommunities);
    }
  }, [searchQuery]);
  
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Communities</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your communities and their departments
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button
            variant="primary"
            icon={<Plus className="h-5 w-5" />}
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Community
          </Button>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            placeholder="Search communities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {communities.map((community, index) => (
          <Link 
            key={community.id}
            href={`/communities/${community.id}`}
            className="animate-slide-in transform transition duration-200 hover:scale-[1.02]"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <Card className="h-full cursor-pointer hover:shadow-md transition-shadow">
              <div className="h-40 relative overflow-hidden rounded-t-lg">
                <img
                  src={community.image}
                  alt={community.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-3 left-4 flex items-center text-white">
                    <Users className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">{community.members} members</span>
                  </div>
                </div>
              </div>
              <CardBody>
                <h3 className="text-lg font-semibold text-gray-900">{community.name}</h3>
                <p className="mt-2 text-sm text-gray-500 line-clamp-2">{community.description}</p>
                
                <div className="mt-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Departments ({community.departments.length})</h4>
                  <div className="flex flex-wrap gap-2">
                    {community.departments.map(dept => (
                      <span key={dept.id} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {dept.name}
                      </span>
                    ))}
                  </div>
                </div>
              </CardBody>
            </Card>
          </Link>
        ))}
        
        {/* Empty state */}
        {communities.length === 0 && (
          <div className="col-span-full">
            <Card>
              <CardBody className="text-center py-10">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100">
                  <Building2 className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No communities found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchQuery ? 'Try adjusting your search query' : 'Get started by creating a new community'}
                </p>
                {!searchQuery && (
                  <div className="mt-6">
                    <Button
                      variant="primary"
                      icon={<Plus className="h-5 w-5" />}
                      onClick={() => setIsAddModalOpen(true)}
                    >
                      Add Community
                    </Button>
                  </div>
                )}
              </CardBody>
            </Card>
          </div>
        )}
      </div>
      
      {/* Modal would be implemented here */}
    </div>
  );
}

export default Communities;