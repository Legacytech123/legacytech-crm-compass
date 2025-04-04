
import React from 'react';
import { Customer } from '@/pages/CustomersPage';
import { Button } from '@/components/ui/button';
import { Edit, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { EditCustomerForm } from './EditCustomerForm';

interface CustomerDetailsProps {
  customer: Customer;
}

export const CustomerDetails: React.FC<CustomerDetailsProps> = ({ customer }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h2 className="text-2xl font-bold">{customer.name}</h2>
          <p className="text-muted-foreground">{customer.businessName}</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit Customer
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Edit Customer</DialogTitle>
            </DialogHeader>
            <EditCustomerForm customer={customer} />
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="border rounded-md p-4">
            <h3 className="font-medium mb-3">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${customer.email}`} className="text-primary hover:underline">
                  {customer.email}
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a href={`tel:${customer.phone}`} className="hover:underline">
                  {customer.phone}
                </a>
              </div>
              {customer.address && (
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <span>{customer.address}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="border rounded-md p-4">
            <h3 className="font-medium mb-3">Additional Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <span className="text-muted-foreground mr-2">Customer since:</span>
                  {new Date(customer.joinDate).toLocaleDateString()}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-4 w-4" /> {/* Empty space for alignment */}
                <div>
                  <span className="text-muted-foreground mr-2">Source:</span>
                  {customer.source}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-4 w-4" /> {/* Empty space for alignment */}
                <div>
                  <span className="text-muted-foreground mr-2">Status:</span>
                  <span className={`inline-block px-2 py-0.5 text-xs rounded-full ${
                    customer.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : customer.status === 'lead'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="border rounded-md p-4">
            <h3 className="font-medium mb-3">Sales Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/50 p-3 rounded-md">
                <p className="text-muted-foreground text-sm">Total Sales</p>
                <p className="text-2xl font-bold">{customer.salesCount}</p>
              </div>
              <div className="bg-muted/50 p-3 rounded-md">
                <p className="text-muted-foreground text-sm">Total Spent</p>
                <p className="text-2xl font-bold">${customer.totalSpent.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          {customer.notes && (
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-3">Notes</h3>
              <p className="text-sm">{customer.notes}</p>
            </div>
          )}
          
          <div className="border rounded-md p-4">
            <h3 className="font-medium mb-3">Quick Actions</h3>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </Button>
              <Button variant="outline" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Button>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Add Note
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
