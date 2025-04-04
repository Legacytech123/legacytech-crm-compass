
import React from 'react';
import { Bell, Search, SidebarClose, SidebarOpen } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const AppHeader = () => {
  const location = useLocation();
  
  // Function to get the page title based on the current route
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/customers':
        return 'Customers';
      case '/sales':
        return 'Sales';
      case '/projects':
        return 'Projects';
      case '/performance':
        return 'Performance';
      case '/messages':
        return 'Messages';
      case '/settings':
        return 'Settings';
      default:
        return 'Legacy Tech CRM';
    }
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center border-b bg-background px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <SidebarOpen className="h-5 w-5" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </SidebarTrigger>
        
        <h1 className="text-xl font-semibold">{getPageTitle()}</h1>
      </div>
      
      <div className="ml-auto flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search..."
            className="w-64 rounded-md border bg-background pl-8 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brand-orange"></span>
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <div className="flex flex-col gap-1">
                  <p className="font-medium">New sales opportunity</p>
                  <p className="text-sm text-muted-foreground">Acme Corp is interested in our services</p>
                  <p className="text-xs text-muted-foreground">15 minutes ago</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-col gap-1">
                  <p className="font-medium">Project milestone completed</p>
                  <p className="text-sm text-muted-foreground">Website redesign Phase 1 completed</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center">
              <Button variant="ghost" size="sm" className="w-full">View all notifications</Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
