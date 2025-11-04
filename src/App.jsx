import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import './styles/variables.css';
import './App.css';

/**
 * MAIN APP COMPONENT
 * Sets up routing and layout
 * 
 * HOW TO ADD NEW PAGES:
 * 1. Create page component in src/pages/
 * 2. Import it here
 * 3. Add <Route> below
 * 4. Add navigation item in Sidebar.jsx
 */

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />

            {/* ADD YOUR NEW ROUTES HERE */}
            {/* <Route path="/products" element={<Products />} /> */}
            {/* <Route path="/orders" element={<Orders />} /> */}

            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DashboardLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;