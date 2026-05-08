import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import BrainGames from "./pages/BrainGames";
import Arts from "./pages/Arts";
import Stories from "./pages/Stories";
import Wellness from "./pages/Wellness";
import Activities from "./pages/Activities";
import Visit from "./pages/Visit";
import Admission from "./pages/Admission";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import AdmissionsPage from "./pages/dashboard/Admissions";
import EnquiriesPage from "./pages/dashboard/Enquiries";
import SchedulesPage from "./pages/dashboard/Schedules";
import SettingsPage from "./pages/dashboard/Settings";

const queryClient = new QueryClient();

// Public Layout Wrapper to keep Navbar and Footer on public pages
const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <Routes>
            {/* Public Routes with Navbar and Footer */}
            <Route path="/" element={<PublicLayout><Index /></PublicLayout>} />
            <Route path="/activities" element={<PublicLayout><Activities /></PublicLayout>} />
            <Route path="/brain-games" element={<PublicLayout><BrainGames /></PublicLayout>} />
            <Route path="/arts" element={<PublicLayout><Arts /></PublicLayout>} />
            <Route path="/stories" element={<PublicLayout><Stories /></PublicLayout>} />
            <Route path="/wellness" element={<PublicLayout><Wellness /></PublicLayout>} />
            <Route path="/admission" element={<PublicLayout><Admission /></PublicLayout>} />
            <Route path="/visit" element={<PublicLayout><Visit /></PublicLayout>} />
            
            {/* Standalone Auth Page */}
            <Route path="/auth" element={<Auth />} />

            {/* Protected Dashboard Routes */}
            <Route 
              path="/dashboard/*" 
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/admissions" element={<AdmissionsPage />} />
                      <Route path="/enquiries" element={<EnquiriesPage />} />
                      <Route path="/schedules" element={<SchedulesPage />} />
                      <Route path="/settings" element={<SettingsPage />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </DashboardLayout>
                </ProtectedRoute>
              } 
            />

            {/* Fallback */}
            <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
