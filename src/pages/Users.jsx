import React, { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import Table from '../components/Table';

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

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            // REPLACE with your API call
            // const data = await getUsers();

            // Mock data
            const mockUsers = [
                { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', joined: '2024-01-15' },
                { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active', joined: '2024-01-14' },
                { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'pending', joined: '2024-01-13' },
                { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Manager', status: 'active', joined: '2024-01-12' },
                { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'inactive', joined: '2024-01-11' },
            ];

            setUsers(mockUsers);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
            setLoading(false);
        }
    };

    const handleEdit = (user) => {
        console.log('Edit user:', user);
        // TODO: Open edit modal or navigate to edit page
        alert(`Edit user: ${user.name}\n\nAdd modal or navigation here!`);
    };

    const handleDelete = async (user) => {
        if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
            try {
                // await deleteUser(user.id);
                setUsers(users.filter(u => u.id !== user.id));
                alert('User deleted successfully!');
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('Failed to delete user');
            }
        }
    };

    const handleAddUser = () => {
        console.log('Add new user');
        // TODO: Open add user modal
        alert('Add User Modal\n\nCreate a modal component for adding users!');
    };

    // Filter users based on search
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const tableColumns = [
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'role', label: 'Role' },
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <h1>Users Management</h1>
                    <p>Manage all users in your system</p>
                </div>
                <button className="btn btn-primary" onClick={handleAddUser}>
                    ➕ Add User
                </button>
            </div>

            {/* Search Bar */}
            <div style={{ marginBottom: '24px' }}>
                <input
                    type="text"
                    placeholder="Search users by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '100%',
                        maxWidth: '400px',
                        padding: '12px 16px',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '14px'
                    }}
                />
            </div>

            {/* Users Table */}
            <Card>
                <Table
                    columns={tableColumns}
                    data={filteredUsers}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </Card>

            {/* Summary */}
            <div style={{ marginTop: '24px', color: 'var(--text-secondary)' }}>
                Showing {filteredUsers.length} of {users.length} users
            </div>
        </div>
    );
};

export default Users;