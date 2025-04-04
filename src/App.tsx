
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { AuthProvider } from "./contexts/AuthContext";
import { DashboardPage } from "./pages/DashboardPage";
import { CustomersPage } from "./pages/CustomersPage";
import { SalesPage } from "./pages/SalesPage";
import NotFound from "./pages/NotFound";
import { ProjectsPage } from "./pages/ProjectsPage";
import { PerformancePage } from "./pages/PerformancePage";
import { MessagesPage } from "./pages/MessagesPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <AppLayout>
                <DashboardPage />
              </AppLayout>
            } />
            <Route path="/customers" element={
              <AppLayout>
                <CustomersPage />
              </AppLayout>
            } />
            <Route path="/sales" element={
              <AppLayout>
                <SalesPage />
              </AppLayout>
            } />
            <Route path="/projects" element={
              <AppLayout>
                <ProjectsPage />
              </AppLayout>
            } />
            <Route path="/performance" element={
              <AppLayout>
                <PerformancePage />
              </AppLayout>
            } />
            <Route path="/messages" element={
              <AppLayout>
                <MessagesPage />
              </AppLayout>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
