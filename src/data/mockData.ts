export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  avatar: string;
  status: string;
}

export interface Volunteer {
  id: string;
  name: string;
  email: string;
  phone: string;
  community: string;
  department: string;
  joinDate: string;
  status: string;
  hours: number;
  avatar: string;
  location: string;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  members: number;
  departments: {
    id: string;
    name: string;
    members: number;
    description: string;
  }[];
  image: string;
  founded: string;
  location: string;
  recentActivities: {
    id: string;
    title: string;
    date: string;
  }[];
}

// Mock data
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'Admin',
    avatar: '/avatars/john.png',
    status: 'Active'
  },
  // Add more mock users as needed
];

export const mockVolunteers: Volunteer[] = [
  {
    id: '1',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1234567890',
    community: 'Main Community',
    department: 'Education',
    joinDate: '2024-01-15',
    status: 'Active',
    hours: 45,
    avatar: '/avatars/jane.png',
    location: 'New York'
  },
  // Add more mock volunteers as needed
];

export const mockCommunities: Community[] = [
  {
    id: '1',
    name: 'Main Community',
    description: 'Our primary community center',
    members: 150,
    departments: [
      {
        id: '1',
        name: 'Education',
        members: 45,
        description: 'Educational programs and workshops'
      },
      {
        id: '2',
        name: 'Healthcare',
        members: 30,
        description: 'Health and wellness initiatives'
      }
    ],
    image: '/communities/main.jpg',
    founded: '2020-01-01',
    location: 'New York',
    recentActivities: [
      {
        id: '1',
        title: 'Community Workshop',
        date: '2024-03-15'
      },
      {
        id: '2',
        title: 'Health Fair',
        date: '2024-03-10'
      }
    ]
  },
  // Add more mock communities as needed
];

export const mockDonors = [
  {
    id: '1',
    name: 'Robert Wilson',
    email: 'rwilson@example.com',
    phone: '(555) 789-0123',
    type: 'individual',
    totalDonated: 2500,
    lastDonation: '2023-12-15',
    frequency: 'monthly',
  },
  {
    id: '2',
    name: 'ABC Corporation',
    email: 'donations@abccorp.com',
    phone: '(555) 321-6547',
    type: 'corporate',
    totalDonated: 15000,
    lastDonation: '2024-01-20',
    frequency: 'quarterly',
  },
  {
    id: '3',
    name: 'Jennifer Adams',
    email: 'jadams@example.com',
    phone: '(555) 654-3210',
    type: 'individual',
    totalDonated: 850,
    lastDonation: '2023-11-05',
    frequency: 'one-time',
  },
];

export const mockEvents = [
  {
    id: '1',
    title: 'Annual Fundraising Gala',
    date: '2024-06-15T18:00:00',
    location: 'Grand Plaza Hotel',
    description: 'Our annual fundraising event with dinner, entertainment, and silent auction.',
    community: 'All Communities',
    status: 'upcoming',
    attendees: 0,
    capacity: 200,
  },
  {
    id: '2',
    title: 'Community Health Workshop',
    date: '2024-05-08T10:00:00',
    location: 'Downtown Community Center',
    description: 'Free health screenings and wellness education for community members.',
    community: 'Downtown Community Center',
    status: 'upcoming',
    attendees: 0,
    capacity: 75,
  },
  {
    id: '3',
    title: 'Youth Art Program',
    date: '2024-04-22T15:30:00',
    location: 'Riverside Outreach Center',
    description: 'Creative arts program for youth ages 10-16.',
    community: 'Riverside Outreach',
    status: 'upcoming',
    attendees: 0,
    capacity: 30,
  },
  {
    id: '4',
    title: 'Volunteer Appreciation Dinner',
    date: '2024-03-18T19:00:00',
    location: 'Community Hall',
    description: 'Dinner to recognize and thank our dedicated volunteers.',
    community: 'All Communities',
    status: 'completed',
    attendees: 85,
    capacity: 100,
  },
];

export const mockDocuments = [
  {
    id: '1',
    name: 'Annual Report 2023.pdf',
    category: 'Reports',
    uploadedBy: 'Admin User',
    uploadDate: '2024-01-15',
    size: '4.2 MB',
    type: 'pdf',
  },
  {
    id: '2',
    name: 'Volunteer Handbook.docx',
    category: 'Guidelines',
    uploadedBy: 'Community Manager',
    uploadDate: '2023-11-10',
    size: '1.8 MB',
    type: 'docx',
  },
  {
    id: '3',
    name: 'Community Survey Results.xlsx',
    category: 'Data',
    uploadedBy: 'Admin User',
    uploadDate: '2024-02-05',
    size: '3.5 MB',
    type: 'xlsx',
  },
  {
    id: '4',
    name: 'Event Planning Template.docx',
    category: 'Templates',
    uploadedBy: 'Community Manager',
    uploadDate: '2023-10-22',
    size: '950 KB',
    type: 'docx',
  },
];

export const mockCommunicationThreads = [
  {
    id: '1',
    title: 'Upcoming Event Coordination',
    participants: ['Admin User', 'Community Manager', 'Volunteer Coordinator'],
    lastUpdate: '2024-03-01T14:30:00',
    unread: true,
    messages: [
      {
        id: '101',
        sender: 'Admin User',
        content: 'We need to finalize the details for the health workshop next month.',
        timestamp: '2024-03-01T10:15:00',
      },
      {
        id: '102',
        sender: 'Community Manager',
        content: "I have secured the venue and equipment. We still need to confirm speakers.",
        timestamp: '2024-03-01T11:20:00',
      },
      {
        id: '103',
        sender: 'Volunteer Coordinator',
        content: "I'll have a list of available volunteers by tomorrow.",
        timestamp: '2024-03-01T14:30:00',
      },
    ],
  },
  {
    id: '2',
    title: 'Donor Recognition Program',
    participants: ['Admin User', 'Fundraising Director'],
    lastUpdate: '2024-02-28T16:45:00',
    unread: false,
    messages: [
      {
        id: '201',
        sender: 'Fundraising Director',
        content: 'Should we create a special tier for our corporate donors?',
        timestamp: '2024-02-28T15:30:00',
      },
      {
        id: '202',
        sender: 'Admin User',
        content: "Yes, that makes sense. Let's discuss the benefits we can offer them.",
        timestamp: '2024-02-28T16:45:00',
      },
    ],
  },
];

export const mockDashboardStats = {
  totalCommunities: 3,
  totalVolunteers: 270,
  totalDonors: 145,
  activeDonors: 82,
  upcomingEvents: 3,
  documentCount: 28,
  recentDonations: 12500,
  volunteerHours: 1240,
  chartData: {
    volunteers: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      data: [210, 220, 235, 245, 260, 270],
    },
    donations: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      data: [8500, 9200, 7800, 10500, 11800, 12500],
    },
    events: {
      labels: ['Education', 'Health', 'Youth', 'Food', 'Family', 'Senior', 'Emergency'],
      data: [4, 3, 5, 2, 3, 1, 2],
    },
  },
};