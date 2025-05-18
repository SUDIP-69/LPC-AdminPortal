import { useEffect, useRef } from 'react';
import { Bell, Calendar, Users } from 'lucide-react';

interface NotificationsDropdownProps {
  onClose: () => void;
}

function NotificationsDropdown({ onClose }: NotificationsDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  
  const notifications = [
    {
      id: 1,
      title: 'New volunteer application',
      message: 'Sarah Johnson has applied to join as a volunteer',
      time: '10 minutes ago',
      icon: Users,
      color: 'bg-primary-100 text-primary-600',
      unread: true,
    },
    {
      id: 2,
      title: 'Event reminder',
      message: 'Community Health Workshop starts tomorrow at 10:00 AM',
      time: '1 hour ago',
      icon: Calendar,
      color: 'bg-secondary-100 text-secondary-600',
      unread: true,
    },
    {
      id: 3,
      title: 'Document uploaded',
      message: 'Admin User uploaded "Volunteer Handbook.docx"',
      time: '3 hours ago',
      icon: Bell,
      color: 'bg-accent-100 text-accent-600',
      unread: true,
    },
    {
      id: 4,
      title: 'Donation received',
      message: 'ABC Corporation donated $5000',
      time: '1 day ago',
      icon: Bell,
      color: 'bg-success-100 text-success-700',
      unread: false,
    },
  ];
  
  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 z-50 w-80 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
    >
      <div className="py-1">
        <div className="px-4 py-2 text-sm font-medium text-gray-700 border-b border-gray-200">
          Notifications
        </div>
        <div className="max-h-96 overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`px-4 py-3 transition hover:bg-gray-50 ${notification.unread ? 'bg-gray-50' : ''}`}
            >
              <div className="flex items-start">
                <div className={`flex-shrink-0 p-1 rounded-full ${notification.color}`}>
                  <notification.icon className="w-5 h-5" />
                </div>
                <div className="ml-3 w-full">
                  <p className="text-sm font-medium text-gray-900">
                    {notification.title}
                    {notification.unread && (
                      <span className="ml-2 inline-block w-2 h-2 bg-primary-500 rounded-full"></span>
                    )}
                  </p>
                  <p className="text-sm text-gray-500 mt-0.5">{notification.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-4 py-2 text-sm text-center border-t border-gray-200">
          <button className="text-primary-600 hover:text-primary-700 font-medium">
            View all notifications
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotificationsDropdown;