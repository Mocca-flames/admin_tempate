import React, { useState, useEffect } from 'react';
import { Card, StatCard } from '../components/Card';
import Table from '../components/Table';
import Chart from '../components/Chart';
import Button from '../components/Button';
import { getMockDashboardStats, getMockUsers, getMockChartData } from '../services/api';

/**
 * DASHBOARD PAGE
 * Main landing page with statistics and overview
 * 
 * HOW TO CUSTOMIZE:
 * 1. Change stat cards to show your metrics
 * 2. Update table to show relevant data
 * 3. Connect to your API endpoints
 */

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalRevenue: 0,
        activeOrders: 0,
        growth: 0
    });
    const [recentUsers, setRecentUsers] = useState([]);
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch data on component mount
    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);

            // Fetch data from mock API functions
            const [statsData, usersData, chartDataResponse] = await Promise.all([
                getMockDashboardStats(),
                getMockUsers(),
                getMockChartData()
            ]);

            setStats(statsData);
            setRecentUsers(usersData.slice(0, 5)); // Show only first 5 users

            // Combine chart data for display
            setChartData({
                labels: chartDataResponse.userGrowth.labels,
                datasets: [
                    chartDataResponse.userGrowth.datasets[0],
                    chartDataResponse.revenue.datasets[0]
                ]
            });

            setLoading(false);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            setLoading(false);
        }
    };

    // Table columns configuration
    const tableColumns = [
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        {
            key: 'status',
            label: 'Status',
            render: (row) => (
                <span className={`status-badge ${row.status}`}>
                    {row.status}
                </span>
            )
        },
        { key: 'joined', label: 'Joined Date' }
    ];

    if (loading) {
        return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome back! Here's what's happening today.</p>

            {/* Statistics Cards */}
            <div className="grid grid-4" style={{ marginTop: '32px', marginBottom: '32px' }}>
                <StatCard
                    icon="👥"
                    label="Total Users"
                    value={stats.totalUsers.toLocaleString()}
                    change="+12%"
                    positive={true}
                    color="primary"
                />
                <StatCard
                    icon="💰"
                    label="Total Revenue"
                    value={`$${stats.totalRevenue.toLocaleString()}`}
                    change="+8%"
                    positive={true}
                    color="success"
                />
                <StatCard
                    icon="📦"
                    label="Active Orders"
                    value={stats.activeOrders}
                    change="-3%"
                    positive={false}
                    color="warning"
                />
                <StatCard
                    icon="📈"
                    label="Growth Rate"
                    value={`${stats.growth}%`}
                    change="+2%"
                    positive={true}
                    color="info"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-2" style={{ marginBottom: '32px' }}>
                <Card title="Analytics Overview">
                    <Chart
                        type="line"
                        data={chartData}
                        height={300}
                        options={{
                            plugins: {
                                legend: {
                                    display: true,
                                    position: 'top'
                                }
                            }
                        }}
                    />
                </Card>
                <Card title="Quick Actions">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <Button variant="primary" fullWidth>
                            Add New User
                        </Button>
                        <Button variant="secondary" fullWidth>
                            Generate Report
                        </Button>
                        <Button variant="outline" fullWidth>
                            Export Data
                        </Button>
                    </div>
                </Card>
            </div>

            {/* Recent Activity Table */}
            <Card title="Recent Users">
                <Table
                    columns={tableColumns}
                    data={recentUsers}
                    onEdit={(row) => console.log('Edit user:', row)}
                    onDelete={(row) => console.log('Delete user:', row)}
                />
            </Card>
        </div>
    );
};

export default Dashboard;