import React, { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import Table from '../components/Table';
import { getAllDrivers } from '../services/api';

const Drivers = () => {
    const [stats, setStats] = useState({
        totalDrivers: 0
    });
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDrivers();
    }, []);

    const fetchDrivers = async () => {
        try {
            setLoading(true);
            console.log('fetctind drivers...');
            const driversData = await getAllDrivers();
            console.log('drivers data received:', driversData);
            setClients(driversData);
            setStats({ totalDrivers: driversData.length });
            setLoading(false);
        } catch (error) {
            console.error('Error fetching drivers:', error);
            setLoading(false);
        }
    };

    // Define table columns for drivers
    const tableColumns = [
        { key: 'full_name', label: 'Full Name' },
        { key: 'email', label: 'Email' },
        { key: 'license_no', label: 'License No' },
        { key: 'vehicle_type', label: 'Vehicle Type' },
        {
            key: 'is_available',
            label: 'Online',
            render: (row) => (
                <span
                    style={{
                        display: 'inline-block',
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: row.is_available ? 'green' : 'red',
                    }}
                />
            ),
        },
    ];

    if (loading) {
        return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;
    }

    return (
        <div>
            <h1>Drivers</h1>
            <p>Manage all drivers in the system.</p>

            {/* Statistics Cards */}
            <div className="grid grid-4" style={{ marginTop: '32px', marginBottom: '32px' }}>
                <Card title="Total Drivers">
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.totalDrivers}</div>
                </Card>
            </div>

            {/* Drivers Table */}
            <Card title="All Drivers">
                <Table
                    columns={tableColumns}
                    data={clients}
                    onEdit={(row) => console.log('Edit driver:', row)}
                    onDelete={(row) => console.log('Delete driver:', row)}
                />
            </Card>
        </div>
    );
};

export default Drivers;
