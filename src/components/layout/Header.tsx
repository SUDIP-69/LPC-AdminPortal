import { Bell, Menu, Search } from 'lucide-react';
import { useState } from 'react';
import NotificationsDropdown from '../common/NotificationsDropdown';

interface HeaderProps {
  openSidebar: () => void;
}

function Header({ openSidebar }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <button
          type="button"
          className="text-gray-500 md:hidden"
          onClick={openSidebar}
        >
          <Menu className="w-6 h-6" aria-hidden="true" />
        </button>
        
        <div className="flex-1 min-w-0 md:ml-6">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              name="search"
              id="search"
              className="block w-full py-2 pl-10 pr-3 text-sm placeholder-gray-500 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Search"
            />
          </div>
        </div>
        
        <div className="flex items-center ml-4 md:ml-6">
          <div className="relative">
            <button
              type="button"
              className="relative p-1 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-error-500 text-xs text-white justify-center items-center">3</span>
              </span>
              <Bell className="w-6 h-6" aria-hidden="true" />
            </button>
            
            {showNotifications && (
              <NotificationsDropdown onClose={() => setShowNotifications(false)} />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;