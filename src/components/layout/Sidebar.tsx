import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  Home,
  Users,
  Calendar,
  FileText,
  BarChart2,
  MessageSquare,
  Settings,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Volunteers', href: '/volunteers', icon: Users },
  {
    name: 'Events',
    href: '/events',
    icon: Calendar,
    children: [
      { name: 'Manage Volunteer', href: '/events/manage-volunteer' },
      { name: 'Attendance Tracking', href: '/events/attendance' },
      { name: 'Budget Management', href: '/events/budget' },
      { name: 'Reports & Analytics', href: '/events/reports' },
    ],
  },
  {
    name: 'Documents',
    href: '/documents',
    icon: FileText,
    children: [
      { name: 'Certificate Management', href: '/documents/certificates' },
      { name: 'Media Asset', href: '/documents/media' },
      { name: 'Certification', href: '/documents/certification' },
    ],
  },
  { name: 'Analytics', href: '/analytics', icon: BarChart2 },
  { name: 'Communications', href: '/communications', icon: MessageSquare },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export default function Sidebar() {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({})
  const router = useRouter()

  const toggleExpand = (name: string) =>
    setExpanded((prev) => ({ ...prev, [name]: !prev[name] }))

  const renderNavItem = (item: any) => {
    const isActive = router.pathname === item.href
    const isExpandable = item.children && item.children.length > 0
    const isExpanded = expanded[item.name]

    return (
      <div key={item.name}>
        <button
          onClick={() => (isExpandable ? toggleExpand(item.name) : router.push(item.href))}
          className={`w-full flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-left ${
            isActive
              ? 'bg-primary text-white'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <item.icon
            className={`h-5 w-5 flex-shrink-0 ${
              isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'
            }`}
          />
          <span className="flex-1">{item.name}</span>
          {isExpandable &&
            (isExpanded ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ))}
        </button>

        {isExpandable && isExpanded && (
          <div className="ml-6 mt-1 space-y-1">
            {item.children.map((sub: any) => {
              const subActive = router.pathname === sub.href
              return (
                <Link
                  key={sub.name}
                  href={sub.href}
                  className={`block rounded-md px-2 py-1 text-sm ${
                    subActive
                      ? 'bg-primary text-white'
                      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {sub.name}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      {/* Mobile toggle */}
      <div className="sticky top-0 z-20 flex h-16 flex-shrink-0 lg:hidden bg-background px-4 items-center">
        <button
          type="button"
          className="text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
          onClick={() => setOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-30 lg:hidden ${open ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black/50" onClick={() => setOpen(false)} />
        <div className="fixed inset-y-0 left-0 w-60 bg-background p-4 flex flex-col">
          {/* Logo & Org Name */}
          <div className="flex items-center gap-2 mb-4">
            <img src="/logo.png" alt="Logo" className="h-8 w-8" />
            <div>
              <div className="text-base font-semibold">Little Paws Care</div>
              <div className="text-xs text-muted-foreground">NGO</div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 space-y-1">
            {navigation.map(renderNavItem)}
          </nav>

          {/* User Info */}
          <div className="mt-auto border-t pt-4 flex items-center gap-3">
            <img src="/avatar.jpg" alt="User Avatar" className="h-8 w-8 rounded-full" />
            <div className="text-sm leading-tight">
              <p className="font-medium">LoginUser.name</p>
              <p className="text-xs text-muted-foreground">m@example.com</p>
            </div>
            <ChevronDown className="ml-auto h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-60 lg:flex-col bg-background border-r">
        <div className="flex h-16 items-center px-4 border-b gap-2">
          <img src="/logo.png" alt="Logo" className="h-8 w-8" />
          <div>
            <div className="text-base font-semibold">Little Paws Care</div>
            <div className="text-xs text-muted-foreground">NGO</div>
          </div>
        </div>

        <nav className="flex-1 mt-2 space-y-1 px-2">
          {navigation.map(renderNavItem)}
        </nav>

        <div className="mt-auto border-t px-4 py-4 flex items-center gap-3">
          <img src="/avatar.jpg" alt="User Avatar" className="h-8 w-8 rounded-full" />
          <div className="text-sm leading-tight">
            <p className="font-medium">LoginUser.name</p>
            <p className="text-xs text-muted-foreground">m@example.com</p>
          </div>
        </div>
      </div>
    </>
  )
}
