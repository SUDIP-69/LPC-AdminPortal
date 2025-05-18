export const NGO_CONFIG = {
  name: 'Little Paws Care',
  description: 'Dedicated to providing care and support for animals in need',
  contact: {
    email: 'contact@littlepawscare.org',
    phone: '+1 (555) 123-4567',
    address: '123 Animal Care Street, City, State 12345',
    socialMedia: {
      facebook: 'https://facebook.com/littlepawscare',
      twitter: 'https://twitter.com/littlepawscare',
      instagram: 'https://instagram.com/littlepawscare'
    }
  },
  programs: {
    categories: [
      'Animal Care',
      'Education',
      'Community Outreach',
      'Training',
      'Emergency Response'
    ],
    statuses: ['active', 'completed', 'planned'],
    priorities: ['low', 'medium', 'high']
  },
  volunteers: {
    roles: [
      'Animal Care',
      'Education',
      'Outreach',
      'Administration',
      'Veterinary Support',
      'Training'
    ],
    statuses: ['active', 'inactive', 'pending'],
    trainingLevels: ['basic', 'intermediate', 'advanced']
  },
  donations: {
    types: ['one-time', 'recurring', 'sponsorship', 'in-kind'],
    statuses: ['pending', 'completed', 'failed'],
    currencies: ['USD', 'EUR', 'GBP']
  },
  events: {
    types: ['workshop', 'fundraiser', 'meeting', 'training', 'adoption'],
    statuses: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    categories: ['public', 'private', 'volunteer-only']
  },
  resources: {
    types: ['equipment', 'supplies', 'facility', 'vehicle'],
    statuses: ['available', 'in-use', 'maintenance', 'retired'],
    categories: ['medical', 'training', 'transportation', 'general']
  },
  partners: {
    types: ['corporate', 'government', 'nonprofit', 'individual'],
    statuses: ['active', 'inactive', 'pending'],
    categories: ['sponsor', 'supporter', 'collaborator']
  },
  analytics: {
    metrics: [
      'animals_helped',
      'community_members_reached',
      'volunteer_hours',
      'donations_received',
      'programs_completed'
    ],
    timeframes: ['daily', 'weekly', 'monthly', 'quarterly', 'yearly']
  },
  notifications: {
    types: [
      'donation_received',
      'volunteer_registration',
      'event_reminder',
      'program_update',
      'resource_alert'
    ],
    priorities: ['low', 'medium', 'high', 'urgent']
  },
  permissions: {
    roles: [
      'admin',
      'manager',
      'coordinator',
      'volunteer',
      'donor',
      'partner'
    ],
    accessLevels: ['read', 'write', 'admin']
  },
  reports: {
    types: [
      'financial',
      'impact',
      'volunteer',
      'program',
      'donation',
      'resource'
    ],
    formats: ['pdf', 'excel', 'csv'],
    schedules: ['daily', 'weekly', 'monthly']
  },
  security: {
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true
    },
    sessionTimeout: 30, // minutes
    maxLoginAttempts: 5
  },
  features: {
    enabled: [
      'donation_tracking',
      'volunteer_management',
      'event_management',
      'resource_tracking',
      'impact_analytics',
      'partner_management',
      'report_generation',
      'notification_system'
    ],
    upcoming: [
      'mobile_app',
      'ai_analytics',
      'automated_reporting',
      'donor_portal'
    ]
  },
  theme: {
    colors: {
      primary: '#4F46E5',
      secondary: '#10B981',
      accent: '#F59E0B',
      success: '#22C55E',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6'
    },
    fonts: {
      primary: 'Inter',
      secondary: 'Poppins'
    }
  }
}; 