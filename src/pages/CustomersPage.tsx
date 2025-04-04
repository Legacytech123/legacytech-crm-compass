
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CustomerList } from '@/components/customers/CustomerList';
import { CustomerDetails } from '@/components/customers/CustomerDetails';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { NewCustomerForm } from '@/components/customers/NewCustomerForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data types
export interface Customer {
  id: string;
  name: string;
  businessName: string;
  email: string;
  phone: string;
  address?: string;
  joinDate: string;
  salesCount: number;
  totalSpent: number;
  status: 'active' | 'inactive' | 'lead';
  source: string;
  notes?: string;
}

export interface Sale {
  id: string;
  customerId: string;
  date: string;
  service: string;
  value: number;
  paymentMode: string;
  seller: string;
  status: 'completed' | 'pending' | 'cancelled';
}

export const CustomersPage = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="page-header mb-0">
          <h1 className="page-title">Customers</h1>
          <p className="page-description">Manage your customer relationships</p>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="shrink-0">
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
            </DialogHeader>
            <NewCustomerForm onSuccess={() => setDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Customer List</CardTitle>
            <CardDescription>View and manage your customers</CardDescription>
          </CardHeader>
          <CardContent>
            <CustomerList 
              onSelectCustomer={setSelectedCustomer}
              selectedCustomerId={selectedCustomer?.id}
            />
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Customer Details</CardTitle>
            <CardDescription>
              {selectedCustomer ? `Viewing ${selectedCustomer.name}` : 'Select a customer to view details'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedCustomer ? (
              <Tabs defaultValue="details">
                <TabsList className="mb-4">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="sales">Sales History</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                </TabsList>
                <TabsContent value="details">
                  <CustomerDetails customer={selectedCustomer} />
                </TabsContent>
                <TabsContent value="sales">
                  <CustomerSalesHistory customerId={selectedCustomer.id} />
                </TabsContent>
                <TabsContent value="projects">
                  <CustomerProjects customerId={selectedCustomer.id} />
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center p-8">
                <p className="text-muted-foreground">Select a customer from the list to view their details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Customer Sales History component
const CustomerSalesHistory = ({ customerId }: { customerId: string }) => {
  // Mock sales data - in a real app, this would be fetched based on the customerId
  const salesData: Sale[] = [
    {
      id: '1',
      customerId,
      date: '2023-12-15',
      service: 'Website Development',
      value: 5000,
      paymentMode: 'Credit Card',
      seller: 'John Doe',
      status: 'completed',
    },
    {
      id: '2',
      customerId,
      date: '2024-01-20',
      service: 'SEO Services',
      value: 1200,
      paymentMode: 'Bank Transfer',
      seller: 'Jane Smith',
      status: 'completed',
    },
    {
      id: '3',
      customerId,
      date: '2024-03-05',
      service: 'Mobile App Development',
      value: 8500,
      paymentMode: 'Installments',
      seller: 'John Doe',
      status: 'pending',
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Sales History</h3>
      {salesData.length > 0 ? (
        <div className="rounded-md border">
          <div className="grid grid-cols-5 border-b px-4 py-3 font-medium">
            <div>Date</div>
            <div>Service</div>
            <div>Amount</div>
            <div>Payment</div>
            <div>Status</div>
          </div>
          {salesData.map((sale) => (
            <div key={sale.id} className="grid grid-cols-5 px-4 py-3 hover:bg-muted/50">
              <div>{new Date(sale.date).toLocaleDateString()}</div>
              <div>{sale.service}</div>
              <div>${sale.value.toLocaleString()}</div>
              <div>{sale.paymentMode}</div>
              <div>
                <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                  sale.status === 'completed' 
                    ? 'bg-green-100 text-green-800' 
                    : sale.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No sales history available</p>
      )}
    </div>
  );
};

// Customer Projects component
const CustomerProjects = ({ customerId }: { customerId: string }) => {
  // Mock project data - in a real app, this would be fetched based on the customerId
  const projects = [
    {
      id: '1',
      name: 'Website Redesign',
      startDate: '2024-01-10',
      endDate: '2024-03-15',
      status: 'completed',
      manager: 'Alice Johnson',
      team: ['Designer 1', 'Developer 1', 'QA 1'],
    },
    {
      id: '2',
      name: 'Mobile App Development',
      startDate: '2024-03-20',
      endDate: '2024-06-30',
      status: 'in-progress',
      manager: 'Bob Williams',
      team: ['Designer 2', 'Developer 2', 'Developer 3'],
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Projects</h3>
      {projects.length > 0 ? (
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="rounded-md border p-4 hover:bg-muted/50">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{project.name}</h4>
                <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                  project.status === 'completed' 
                    ? 'bg-green-100 text-green-800' 
                    : project.status === 'in-progress'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {project.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Start Date:</span>{' '}
                  {new Date(project.startDate).toLocaleDateString()}
                </div>
                <div>
                  <span className="text-muted-foreground">End Date:</span>{' '}
                  {new Date(project.endDate).toLocaleDateString()}
                </div>
                <div>
                  <span className="text-muted-foreground">Project Manager:</span>{' '}
                  {project.manager}
                </div>
                <div>
                  <span className="text-muted-foreground">Team:</span>{' '}
                  {project.team.join(', ')}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No projects available</p>
      )}
    </div>
  );
};
