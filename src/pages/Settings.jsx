import React, { useState } from 'react';
import { Card } from '../components/Card';

/**
 * SETTINGS PAGE
 * Application settings and configurations
 * 
 * HOW TO CUSTOMIZE:
 * 1. Add your own settings sections
 * 2. Connect to your API for saving settings
 * 3. Add validation for form inputs
 */

const Settings = () => {
    const [settings, setSettings] = useState({
        siteName: 'Admin Pro',
        email: 'admin@example.com',
        notifications: true,
        darkMode: false,
        language: 'en',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        console.log('Save settings:', settings);
        // TODO: Call API to save settings
        alert('Settings saved successfully!');
    };

    return (
        <div>
            <h1>Settings</h1>
            <p>Manage your application settings and preferences</p>

            <div className="grid grid-2" style={{ marginTop: '32px' }}>
                {/* General Settings */}
                <Card title="General Settings">
                    <form onSubmit={handleSave}>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                                Site Name
                            </label>
                            <input
                                type="text"
                                name="siteName"
                                value={settings.siteName}
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    padding: '10px 12px',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 'var(--radius-sm)',
                                    fontSize: '14px'
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                                Admin Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={settings.email}
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    padding: '10px 12px',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 'var(--radius-sm)',
                                    fontSize: '14px'
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                                Language
                            </label>
                            <select
                                name="language"
                                value={settings.language}
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    padding: '10px 12px',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 'var(--radius-sm)',
                                    fontSize: '14px'
                                }}
                            >
                                <option value="en">English</option>
                                <option value="es">Spanish</option>
                                <option value="fr">French</option>
                                <option value="de">German</option>
                            </select>
                        </div>

                        <button type="submit" className="btn btn-primary">
                            💾 Save Changes
                        </button>
                    </form>
                </Card>

                {/* Preferences */}
                <Card title="Preferences">
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                name="notifications"
                                checked={settings.notifications}
                                onChange={handleChange}
                                style={{ marginRight: '12px', width: '18px', height: '18px' }}
                            />
                            <div>
                                <div style={{ fontWeight: '500' }}>Enable Notifications</div>
                                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                                    Receive email notifications for important updates
                                </div>
                            </div>
                        </label>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                name="darkMode"
                                checked={settings.darkMode}
                                onChange={handleChange}
                                style={{ marginRight: '12px', width: '18px', height: '18px' }}
                            />
                            <div>
                                <div style={{ fontWeight: '500' }}>Dark Mode</div>
                                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                                    Use dark theme for the interface
                                </div>
                            </div>
                        </label>
                    </div>
                </Card>
            </div>

            {/* Danger Zone */}
            <Card title="⚠️ Danger Zone" action={null}>
                <div style={{ padding: '20px', backgroundColor: '#fef2f2', borderRadius: 'var(--radius-sm)', border: '1px solid #fecaca' }}>
                    <h3 style={{ color: 'var(--danger)', marginBottom: '12px' }}>Delete Account</h3>
                    <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
                        Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <button
                        className="btn"
                        style={{ backgroundColor: 'var(--danger)', color: 'white' }}
                        onClick={() => alert('Account deletion would happen here')}
                    >
                        Delete Account
                    </button>
                </div>
            </Card>
        </div>
    );
};

export default Settings;