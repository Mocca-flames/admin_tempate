import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Sidebar.css';

/**
 * SIDEBAR COMPONENT
 * 
 * HOW TO CUSTOMIZE:
 * 1. Change logo and company name
 * 2. Add/remove navigation items
 * 3. Change icons (using emojis for simplicity)
 * 4. Update routes to match your pages
 */

const Sidebar = () => {
    const location = useLocation();

    // Check if current route matches
    const isActive = (path) => location.pathname === path;

    // CUSTOMIZE THESE NAV ITEMS
    const navItems = [
        {
            section: 'Main',
            items: [
                { path: '/', icon: '📊', label: 'Dashboard' },
                { path: '/create-order', icon: '🛒', label: 'Create Order' },
            ]
        },
        {
            section: 'Pricing',
            items: [
                { path: '/price', icon: '💳', label: 'Pricing' },
            ]
        },
        {
            section: 'Management',
            items: [
                { path: '/clients', icon: '👥', label: 'Clients' },
                { path: '/drivers', icon: '🚘', label: 'Drivers' },
                { path: '/orders', icon: '🛒', label: 'Orders' },
            ]
        },
        {
            section: 'Settings',
            items: [
                { path: '/settings', icon: '⚙️', label: 'Settings' },
            ]
        }
    ];

    return (
        <aside className="sidebar">
            {/* Logo Section - CUSTOMIZE THIS */}
            <div className="sidebar-logo">
                <div className="logo-icon">M</div>
                <h2>Molo Admin</h2>
            </div>

            {/* Navigation */}
            <nav className="sidebar-nav">
                {navItems.map((section, idx) => (
                    <div key={idx} className="nav-section">
                        <div className="nav-section-title">{section.section}</div>
                        <ul>
                            {section.items.map((item) => (
                                <li key={item.path} className="nav-item">
                                    <Link
                                        to={item.path}
                                        className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                                    >
                                        <span className="nav-icon">{item.icon}</span>
                                        <span>{item.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;