import React from 'react';
import ThemeToggle from './ThemeToggle';
import '../styles/Header.css';

/**
 * HEADER COMPONENT
 * Top bar with search, notifications, and user profile
 * 
 * HOW TO CUSTOMIZE:
 * 1. Update user name and role
 * 2. Connect search to your search functionality
 * 3. Add dropdown menus for notifications and profile
 */

const Header = () => {
    return (
        <header className="header">
            {/* Search Bar */}
            <div className="header-search">
                <span className="search-icon">🔍</span>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search..."
                />
            </div>

            {/* Actions */}
            <div className="header-actions">
                {/* Notifications */}
                <button className="header-icon-btn">
                    <span>🔔</span>
                    <span className="notification-badge">5</span>
                </button>

                {/* Messages */}
                <button className="header-icon-btn">
                    <span>💬</span>
                    <span className="notification-badge">3</span>
                </button>

                {/* Theme Toggle */}
                <ThemeToggle />

                {/* User Profile */}
                <div className="header-profile">
                    <div className="profile-avatar">JD</div>
                    <div className="profile-info">
                        <h4>John Doe</h4>
                        <p>Administrator</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;