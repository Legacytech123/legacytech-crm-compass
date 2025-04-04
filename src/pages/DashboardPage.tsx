
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line
} from 'recharts';
import { ArrowUpRight, DollarSign, Users, Briefcase, Clock } from 'lucide-react';

// Mock data for dashboard
const salesData = [
  { month: 'Jan', amount: 12000 },
  { month: 'Feb', amount: 15000 },
  { month: 'Mar', amount: 18000 },
  { month: 'Apr', amount: 16000 },
  { month: 'May', amount: 21000 },
  { month: 'Jun', amount: 19000 },
];

const projectStatusData = [
  { name: 'Completed', value: 45, color: '#319795' },
  { name: 'In Progress', value: 30, color: '#3182CE' },
  { name: 'Planning', value: 15, color: '#805AD5' },
  { name: 'On Hold', value: 10, color: '#F6AD55' },
];

const leadSourceData = [
  { month: 'Jan', Referral: 25, Social: 18, Website: 30, Event: 12 },
  { month: 'Feb', Referral: 28, Social: 22, Website: 25, Event: 18 },
  { month: 'Mar', Referral: 32, Social: 20, Website: 35, Event: 15 },
  { month: 'Apr', Referral: 35, Social: 25, Website: 32, Event: 20 },
  { month: 'May', Referral: 30, Social: 28, Website: 38, Event: 22 },
  { month: 'Jun', Referral: 38, Social: 32, Website: 40, Event: 25 },
];

export const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="page-title">Welcome back, {user?.name}</h1>
        <p className="page-description">Here's what's happening with your business today.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Sales</p>
                <h3 className="text-2xl font-bold">$105,200</h3>
                <p className="text-xs font-medium text-green-500 flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" /> 12% from last month
                </p>
              </div>
              <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Customers</p>
                <h3 className="text-2xl font-bold">256</h3>
                <p className="text-xs font-medium text-green-500 flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" /> 8% from last month
                </p>
              </div>
              <div className="h-12 w-12 rounded-md bg-brand-blue/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-brand-blue" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
                <h3 className="text-2xl font-bold">38</h3>
                <p className="text-xs font-medium text-green-500 flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" /> 5% from last month
                </p>
              </div>
              <div className="h-12 w-12 rounded-md bg-brand-teal/10 flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-brand-teal" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Turnaround</p>
                <h3 className="text-2xl font-bold">14 days</h3>
                <p className="text-xs font-medium text-green-500 flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" /> 10% faster than target
                </p>
              </div>
              <div className="h-12 w-12 rounded-md bg-brand-orange/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-brand-orange" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Sales</CardTitle>
            <CardDescription>Sales performance over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [`$${value}`, 'Amount']}
                    contentStyle={{ backgroundColor: 'white', borderRadius: '8px' }}
                  />
                  <Bar dataKey="amount" fill="#319795" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Status</CardTitle>
            <CardDescription>Current distribution of project statuses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <Pie
                    data={projectStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {projectStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lead Sources</CardTitle>
          <CardDescription>New leads by source over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={leadSourceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Referral" stroke="#319795" strokeWidth={2} />
                <Line type="monotone" dataKey="Social" stroke="#3182CE" strokeWidth={2} />
                <Line type="monotone" dataKey="Website" stroke="#805AD5" strokeWidth={2} />
                <Line type="monotone" dataKey="Event" stroke="#F6AD55" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity and Tasks sections can be added here */}
    </div>
  );
};
