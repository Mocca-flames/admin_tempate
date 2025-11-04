import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

/**
 * DASHBOARD LAYOUT
 * Wraps all pages with sidebar and header
 * 
 * HOW TO USE:
 * Wrap your pages with this layout in App.jsx
 */

const DashboardLayout = ({ children }) => {
    return (
        <div className="dashboard-layout">
            <Sidebar />
            <div className="main-content">
                <Header />
                <div className="content-wrapper">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;