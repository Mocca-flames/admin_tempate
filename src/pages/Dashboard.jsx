import React, { useState, useEffect } from 'react';
import { Card, StatCard } from '../components/Card';
import Table from '../components/Table';
import Chart from '../components/Chart';
import Button from '../components/Button';
import { getStatsSummary, getAllOrders, getAllClients } from '../services/api';

// Helper functions for formatting
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-ZA', {
        style: 'currency',
        currency: 'ZAR',
        minimumFractionDigits: 2,
    }).format(amount);
};

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-ZA', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

const getClientName = (clientId, clients) => {
    const client = clients.find(c => c.id === clientId);
    return client ? client.full_name : clientId;
};

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalRevenue: 0,
        averagePrice: 0,
        activeDrivers: 0,
        periodStart: '',
        periodEnd: '',
        topClients: []
    });
    const [recentOrders, setRecentOrders] = useState([]);
    const [chartData, setChartData] = useState(null);
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);

            // ✅ Use your real API endpoints
            const [statsData, ordersData, clientsData] = await Promise.all([
                getStatsSummary(30),  // Last 30 days
                getAllOrders(),
                getAllClients()
            ]);

            // ✅ Map API response to state
            setStats({
                totalOrders: statsData.orders?.total || 0,
                totalRevenue: statsData.revenue?.gross_revenue || 0,
                averagePrice: statsData.revenue?.gross_revenue / statsData.orders?.total || 0,
                activeDrivers: statsData.users?.total_drivers || 0,
                periodStart: statsData.period_start,
                periodEnd: statsData.period_end,
                topClients: statsData.top_clients || []
            });

            // ✅ Get recent orders (last 5)
            setRecentOrders(ordersData.slice(0, 5));

            // ✅ Set clients data for mapping client IDs to names
            setClients(clientsData);

            // ✅ Prepare chart data from orders_by_status (if available)
            if (statsData.orders_by_status) {
                setChartData({
                    labels: Object.keys(statsData.orders_by_status),
                    datasets: [{
                        label: 'Orders by Status',
                        data: Object.values(statsData.orders_by_status),
                        backgroundColor: ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#6366f1']
                    }]
                });
            } else {
                setChartData({
                    labels: ['Pending', 'Completed', 'Cancelled'],
                    datasets: [{
                        label: 'Orders by Status',
                        data: [statsData.orders?.total - statsData.orders?.completed || 0, statsData.orders?.completed || 0, 0],
                        backgroundColor: ['#3b82f6', '#22c55e', '#ef4444']
                    }]
                });
            }

            setLoading(false);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            setLoading(false);
        }
    };

    // ✅ Map order data to table columns
    const tableColumns = [
        { key: 'id', label: 'Order ID' },
        { key: 'pickup_address', label: 'Pickup' },
        { key: 'dropoff_address', label: 'Dropoff' },
        {
            key: 'status',
            label: 'Status',
            render: (row) => (
                <span className={`status-badge ${row.status}`}>
                    {row.status}
                </span>
            )
        },
        { key: 'price', label: 'Price' }
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
                    icon="📦"
                    label="Total Orders"
                    value={stats.totalOrders}
                    color="primary"
                />
                <StatCard
                    icon="💰"
                    label="Total Revenue"
                    value={formatCurrency(stats.totalRevenue)}
                    color="success"
                />
                <StatCard
                    icon="📊"
                    label="Average Price"
                    value={formatCurrency(stats.averagePrice)}
                    color="info"
                />
                <StatCard
                    icon="🚗"
                    label="Active Drivers"
                    value={stats.activeDrivers}
                    color="warning"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-2" style={{ marginBottom: '32px' }}>
                <Card title="Orders by Status">
                    <Chart
                        type="bar"
                        data={chartData}
                        height={300}
                    />
                </Card>
                <Card title="Quick Actions">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <Button variant="primary" fullWidth>
                            Create New Order
                        </Button>
                        <Button variant="secondary" fullWidth>
                            View All Orders
                        </Button>
                        <Button variant="outline" fullWidth>
                            Manage Drivers
                        </Button>
                    </div>
                </Card>
            </div>

            {/* Top Clients Section */}
            <div className="grid grid-1" style={{ marginBottom: '32px' }}>
                <Card title="Top Clients">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {stats.topClients.length > 0 ? (
                            stats.topClients.map((client, index) => (
                                <div
                                    key={client.client_id}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '12px',
                                        backgroundColor: index % 2 === 0 ? '#f8f9fa' : '#ffffff',
                                        borderRadius: '8px',
                                        border: '1px solid #e9ecef'
                                    }}
                                >
                                    <div>
                                        <span style={{ fontWeight: '500', color: '#495057' }}>
                                            {getClientName(client.client_id, clients)}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ fontSize: '14px', color: '#6c757d' }}>
                                            {client.orders} order{client.orders !== 1 ? 's' : ''}
                                        </span>
                                        <span style={{
                                            backgroundColor: '#007bff',
                                            color: 'white',
                                            padding: '4px 8px',
                                            borderRadius: '12px',
                                            fontSize: '12px',
                                            fontWeight: '500'
                                        }}>
                                            #{index + 1}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p style={{ textAlign: 'center', color: '#6c757d', margin: '20px 0' }}>
                                No client data available
                            </p>
                        )}
                    </div>
                </Card>
            </div>
            {/* Recent Orders Table */}
            <Card title="Recent Orders" style={{ marginTop: '32px' }}>
                <Table
                    columns={tableColumns}
                    data={recentOrders}
                    onEdit={(row) => console.log('Edit order:', row)}
                    onDelete={(row) => console.log('Delete order:', row)}
                />
            </Card>
        </div>
    );
};

export default Dashboard;