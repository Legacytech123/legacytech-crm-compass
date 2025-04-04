
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Customer } from '@/pages/CustomersPage';

// Mock customer data
const MOCK_CUSTOMERS: Customer[] = [
  {
    id: '1',
    name: 'John Smith',
    businessName: 'Smith Enterprises',
    email: 'john@smithenterprises.com',
    phone: '(555) 123-4567',
    address: '123 Business St, City, State 12345',
    joinDate: '2023-06-15',
    salesCount: 3,
    totalSpent: 12500,
    status: 'active',
    source: 'Referral',
    notes: 'Long-term client, prefers email communication',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    businessName: 'Johnson Digital',
    email: 'sarah@johnsondigital.com',
    phone: '(555) 987-6543',
    joinDate: '2023-09-22',
    salesCount: 2,
    totalSpent: 8750,
    status: 'active',
    source: 'Website',
  },
  {
    id: '3',
    name: 'Michael Wong',
    businessName: 'Wong Innovations',
    email: 'michael@wonginnovations.com',
    phone: '(555) 456-7890',
    joinDate: '2024-01-10',
    salesCount: 1,
    totalSpent: 4200,
    status: 'active',
    source: 'Trade Show',
  },
  {
    id: '4',
    name: 'Emily Davis',
    businessName: 'Davis Marketing',
    email: 'emily@davismarketing.com',
    phone: '(555) 789-0123',
    joinDate: '2024-02-05',
    salesCount: 0,
    totalSpent: 0,
    status: 'lead',
    source: 'Social Media',
    notes: 'Interested in website redesign services',
  },
  {
    id: '5',
    name: 'Robert Chen',
    businessName: 'Chen Consulting',
    email: 'robert@chenconsulting.com',
    phone: '(555) 321-0987',
    joinDate: '2023-04-18',
    salesCount: 4,
    totalSpent: 18900,
    status: 'inactive',
    source: 'Previous Client',
    notes: 'Was a regular client but hasn\'t ordered in 6 months',
  },
];

interface CustomerListProps {
  onSelectCustomer: (customer: Customer) => void;
  selectedCustomerId?: string;
}

export const CustomerList: React.FC<CustomerListProps> = ({ 
  onSelectCustomer,
  selectedCustomerId
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter customers based on search term
  const filteredCustomers = MOCK_CUSTOMERS.filter((customer) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      customer.name.toLowerCase().includes(searchLower) ||
      customer.businessName.toLowerCase().includes(searchLower) ||
      customer.email.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search customers..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="space-y-2 mt-4 max-h-[600px] overflow-y-auto pr-1">
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              className={`border rounded-md p-3 cursor-pointer transition-colors ${
                selectedCustomerId === customer.id 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-muted'
              }`}
              onClick={() => onSelectCustomer(customer)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{customer.name}</h3>
                  <p className={`text-sm ${
                    selectedCustomerId === customer.id 
                      ? 'text-primary-foreground/80' 
                      : 'text-muted-foreground'
                  }`}>
                    {customer.businessName}
                  </p>
                </div>
                <div className={`px-2 py-1 text-xs rounded-full ${
                  customer.status === 'active' 
                    ? selectedCustomerId === customer.id
                      ? 'bg-primary-foreground/20 text-primary-foreground'
                      : 'bg-green-100 text-green-800'
                    : customer.status === 'lead'
                    ? selectedCustomerId === customer.id
                      ? 'bg-primary-foreground/20 text-primary-foreground'
                      : 'bg-blue-100 text-blue-800'
                    : selectedCustomerId === customer.id
                      ? 'bg-primary-foreground/20 text-primary-foreground'
                      : 'bg-gray-100 text-gray-800'
                }`}>
                  {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                </div>
              </div>
              <div className={`text-sm ${
                selectedCustomerId === customer.id 
                  ? 'text-primary-foreground/80' 
                  : 'text-muted-foreground'
              }`}>
                {customer.email}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted-foreground p-4">
            No customers found
          </p>
        )}
      </div>
    </div>
  );
};
