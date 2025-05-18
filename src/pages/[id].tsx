import { useRouter } from 'next/router';
import { Card, CardBody, CardHeader } from '../components/common/Card';
import { ArrowLeft, Users, Calendar, MapPin } from 'lucide-react';
import Button from '../components/common/Button';
import { mockCommunities } from '../data/mockData';

export default function CommunityDetails() {
  const router = useRouter();
  const { id } = router.query;
  
  const community = mockCommunities.find(c => c.id === id);

  if (!community) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Community not found</h1>
          <p className="mt-2 text-gray-500">The community you're looking for doesn't exist.</p>
          <Button
            variant="primary"
            icon={<ArrowLeft className="h-5 w-5" />}
            onClick={() => router.push('/communities')}
            className="mt-4"
          >
            Back to Communities
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <Button
          variant="secondary"
          icon={<ArrowLeft className="h-5 w-5" />}
          onClick={() => router.push('/communities')}
        >
          Back to Communities
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <div className="h-48 relative overflow-hidden rounded-t-lg">
              <img
                src={community.image}
                alt={community.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                <div className="absolute bottom-4 left-4">
                  <h1 className="text-2xl font-bold text-white">{community.name}</h1>
                  <p className="text-white/80 mt-1">{community.description}</p>
                </div>
              </div>
            </div>
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-primary-600 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Members</p>
                    <p className="font-semibold text-gray-900">{community.members}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-primary-600 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Founded</p>
                    <p className="font-semibold text-gray-900">{community.founded}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-primary-600 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-semibold text-gray-900">{community.location}</p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          <div className="mt-6">
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-gray-900">Departments</h2>
              </CardHeader>
              <CardBody>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {community.departments.map((dept) => (
                    <div key={dept.id} className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium text-gray-900">{dept.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">{dept.description}</p>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{dept.members} members</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {community.recentActivities?.map((activity, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-primary-50 flex items-center justify-center">
                        <Calendar className="h-4 w-4 text-primary-600" />
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-500">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
} 