import Link from 'next/link'
import { 
  BsSpeedometer2, 
  BsBox, 
  BsCart3, 
  BsGraphUp,
  BsPersonCircle,
  BsGear
} from 'react-icons/bs'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: BsSpeedometer2 },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BsGraphUp },
  { href: '/dashboard/products', label: 'Products', icon: BsBox },
  { href: '/dashboard/orders', label: 'Orders', icon: BsCart3 },
  { href: '/dashboard/customers', label: 'Customers', icon: BsPersonCircle },
  { href: '/dashboard/settings', label: 'Settings', icon: BsGear },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-slate-900 text-gray-300">
        {/* Branding */}
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold text-white">On-Way Admin</h1>
        </div>

        {/* Navigation */}
        <nav className="mt-6">
          <div className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Main Menu
          </div>
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link 
                  href={item.href}
                  className="flex items-center px-6 py-3 text-sm hover:bg-slate-800 hover:text-white transition-colors group"
                >
                  <item.icon className="w-5 h-5 mr-3 group-hover:text-blue-400" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Section */}
        <div className="absolute bottom-0 w-64 p-6 border-t border-slate-800">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
              <BsPersonCircle className="w-5 h-5" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-gray-500">admin@onway.com</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-8 bg-gray-100 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}