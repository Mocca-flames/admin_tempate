import React from 'react';
import '../styles/Card.css';

/**
 * CARD COMPONENT
 * Reusable card for displaying content
 * 
 * PROPS:
 * - title: Card title
 * - children: Card content
 * - action: Optional action button
 */

export const Card = ({ title, children, action }) => {
    return (
        <div className="card">
            {title && (
                <div className="card-header">
                    <h3 className="card-title">{title}</h3>
                    {action && <div>{action}</div>}
                </div>
            )}
            <div className="card-body">
                {children}
            </div>
        </div>
    );
};

/**
 * STAT CARD COMPONENT
 * Special card for displaying statistics
 * 
 * PROPS:
 * - icon: Emoji icon
 * - label: Stat description
 * - value: Stat value
 * - change: Percentage change (e.g., "+12%")
 * - positive: Boolean - is change positive?
 * - color: 'primary', 'success', 'warning', 'danger'
 */

export const StatCard = ({ icon, label, value, change, positive, color = 'primary' }) => {
    return (
        <div className="stat-card">
            <div className="stat-header">
                <div className={`stat-icon ${color}`}>
                    {icon}
                </div>
            </div>
            <div className="stat-value">{value}</div>
            <div className="stat-label">{label}</div>
            {change && (
                <span className={`stat-change ${positive ? 'positive' : 'negative'}`}>
                    {positive ? '↑' : '↓'} {change}
                </span>
            )}
        </div>
    );
};