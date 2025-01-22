import { Card } from "@/components/ui/Card"
import { BsCart4, BsShop, BsPerson, BsCurrencyDollar } from "react-icons/bs"
import { IconType } from "react-icons"

interface StatsCardProps {
  icon: IconType;
  title: string;
  value: string | number;
  change: string;
  color: string;
}

export function StatsCard({ icon: Icon, title, value, change, color }: StatsCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center space-x-4">
        <div className={`p-3 ${color} rounded-full`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
          <p className="text-xs font-medium text-green-600">{change}</p>
        </div>
      </div>
    </Card>
  )
}

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          icon={BsCart4}
          title="Total Orders"
          value="1,234"
          change="+12.5% from last month"
          color="bg-blue-100 text-blue-600"
        />
        <StatsCard
          icon={BsCurrencyDollar}
          title="Revenue"
          value="$12,345"
          change="+8.2% from last month"
          color="bg-green-100 text-green-600"
        />
        <StatsCard
          icon={BsShop}
          title="Active Shops"
          value="48"
          change="+4 new this month"
          color="bg-purple-100 text-purple-600"
        />
        <StatsCard
          icon={BsPerson}
          title="Active Users"
          value="892"
          change="+23 this week"
          color="bg-orange-100 text-orange-600"
        />
      </div>

      {/* Recent Orders */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Order ID</th>
                <th className="text-left py-3 px-4">Customer</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Amount</th>
              </tr>
            </thead>
            <tbody>
              {[1,2,3].map((order) => (
                <tr key={order} className="border-b">
                  <td className="py-3 px-4">#ORD-{order}234</td>
                  <td className="py-3 px-4">Customer {order}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      Delivered
                    </span>
                  </td>
                  <td className="py-3 px-4">${(order * 100).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}