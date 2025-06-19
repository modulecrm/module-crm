
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AuthPage from '@/components/auth/AuthPage';
import Index from '@/pages/Index';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <Router>
            <Routes>
              <Route path="/auth" element={<AuthPage />} />
              <Route 
                path="/*" 
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </Router>
          <Toaster />
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
