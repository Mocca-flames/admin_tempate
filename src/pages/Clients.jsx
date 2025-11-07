import React, { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import Table from '../components/Table';
import { getAllClients } from '../services/api';

/**
 * USERS PAGE
 * Manage all users
 * 
 * HOW TO CUSTOMIZE:
 * 1. Change table columns for your data
 * 2. Add filters and search
 * 3. Implement add/edit user modals
 * 4. Connect to your API
 */

const Clients = () => {
    const [stats, setStats] = useState({
        totalClients: 0
    });
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            setLoading(true);
            console.log('Fetching clients...');
            const clientsData = await getAllClients();
            console.log('Clients data received:', clientsData);
            setClients(clientsData);
            setStats({ totalClients: clientsData.length });
            setLoading(false);
        } catch (error) {
            console.error('Error fetching clients:', error);
            setLoading(false);
        }
    };

    // Define table columns for clients
    const tableColumns = [
        { key: 'id', label: 'Client ID' },
        { key: 'full_name', label: 'Full Name' },
        { key: 'email', label: 'Email' },
        { key: 'phone_number', label: 'Phone Number' },
        { key: 'created_at', label: 'Created At' }
    ];

    if (loading) {
        return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;
    }

    return (
        <div>
            <h1>Clients</h1>
            <p>Manage all clients in the system.</p>

            {/* Statistics Cards */}
            <div className="grid grid-4" style={{ marginTop: '32px', marginBottom: '32px' }}>
                <Card title="Total Clients">
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.totalClients}</div>
                </Card>
            </div>

            {/* Clients Table */}
            <Card title="All Clients">
                <Table
                    columns={tableColumns}
                    data={clients}
                    onEdit={(row) => console.log('Edit client:', row)}
                    onDelete={(row) => console.log('Delete client:', row)}
                />
            </Card>
        </div>
    );
};

export default Clients;