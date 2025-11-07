import React, { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import Table from '../components/Table';
import Modal from '../components/Modal';
import { getAllOrders, deleteOrder, updateOrderStatus } from '../services/api';


const ORDER_STATUSES = [
    'pending',
    'accepted',
    'in_progress',
    'completed',
    'cancelled'
];

const Orders = () => {
    const [stats, setStats] = useState({
        totalOrders: 0
    });
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState(null);
    const [deleteStatus, setDeleteStatus] = useState(null); // 'success' or 'error'
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [orderToUpdate, setOrderToUpdate] = useState(null);
    const [newStatus, setNewStatus] = useState('');
    const [updateStatus, setUpdateStatus] = useState(null); // 'success' or 'error'

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            console.log('Fetching orders...');
            const ordersData = await getAllOrders();
            console.log('orders data received:', ordersData);
            setOrders(ordersData);
            setStats({ totalOrders: ordersData.length });
            setLoading(false);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setLoading(false);
        }
    };

    const handleDeleteClick = (row) => {
        setOrderToDelete(row);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!orderToDelete) return;

        try {
            console.log('Deleting order:', orderToDelete.id);
            await deleteOrder(orderToDelete.id);
            console.log('Order deleted successfully');
            setDeleteStatus('success');
            // Refresh orders list
            await fetchOrders();
        } catch (error) {
            console.error('Error deleting order:', error);
            setDeleteStatus('error');
        } finally {
            setShowDeleteModal(false);
            setOrderToDelete(null);
        }
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setOrderToDelete(null);
        setDeleteStatus(null);
    };
    const handleStatusUpdateClick = (row) => {
        setOrderToUpdate(row);
        setNewStatus(row.status); // Initialize with current status
        setShowStatusModal(true);
    };

    const confirmStatusUpdate = async () => {
        if (!orderToUpdate || !newStatus) return;

        try {
            console.log(`Updating order ${orderToUpdate.id} status to: ${newStatus}`);
            await updateOrderStatus(orderToUpdate.id, newStatus);
            console.log('Order status updated successfully');
            setUpdateStatus('success');
            // Refresh orders list
            await fetchOrders();
        } catch (error) {
            console.error('Error updating order status:', error);
            setUpdateStatus('error');
        } finally {
            // Keep modal open briefly to show success/error, then close
            setTimeout(() => {
                closeStatusModal();
            }, 1500);
        }
    };

    const closeStatusModal = () => {
        setShowStatusModal(false);
        setOrderToUpdate(null);
        setNewStatus('');
        setUpdateStatus(null);
    };


    // Define table columns for orders
    const tableColumns = [
        { key: 'id', label: 'Order ID' },
        { key: 'pickup_address', label: 'Pickup' },
        { key: 'dropoff_address', label: 'Dropoff' },
        {
            key: 'status',
            label: 'Status',
            render: (row) => (
                <div
                    onClick={() => handleStatusUpdateClick(row)}
                    style={{ cursor: 'pointer' }}
                    title="Click to update status"
                >
                    <span className={`status-badge ${row.status}`}>
                        {row.status}
                    </span>
                </div>
            )
        },
        { key: 'price', label: 'Price' }
    ];

    if (loading) {
        return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;
    }

    return (
        <div>
            <h1>Orders</h1>
            <p>Manage all orders in the system.</p>

            {/* Statistics Cards */}
            <div className="grid grid-4" style={{ marginTop: '32px', marginBottom: '32px' }}>
                <Card title="Total Orders">
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.totalOrders}</div>
                </Card>
            </div>

            {/* Orders Table */}
            <Card title="All Orders">
                <Table
                    columns={tableColumns}
                    data={orders}
                    onEdit={(row) => console.log('Edit order:', row)}
                    onDelete={handleDeleteClick}
                />
            </Card>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={showDeleteModal}
                onClose={closeDeleteModal}
                title="Confirm Delete"
                actions={[
                    {
                        label: 'Cancel',
                        onClick: closeDeleteModal,
                        variant: 'secondary'
                    },
                    {
                        label: 'Delete',
                        onClick: confirmDelete,
                        variant: 'danger'
                    }
                ]}
            >
                <p>Are you sure you want to delete order #{orderToDelete?.id}?</p>
                <p>This action cannot be undone.</p>
                {deleteStatus === 'success' && (
                    <div style={{ color: 'green', marginTop: '10px' }}>
                        Order deleted successfully!
                    </div>
                )}
                {deleteStatus === 'error' && (
                    <div style={{ color: 'red', marginTop: '10px' }}>
                        Failed to delete order. Please try again.
                    </div>
                )}
            </Modal>
            {/* Status Update Modal */}
            <Modal
                isOpen={showStatusModal}
                onClose={closeStatusModal}
                title={`Update Status for Order #${orderToUpdate?.id}`}
                actions={[
                    {
                        label: 'Cancel',
                        onClick: closeStatusModal,
                        variant: 'secondary'
                    },
                    {
                        label: 'Update Status',
                        onClick: confirmStatusUpdate,
                        variant: 'primary',
                        disabled: !newStatus || newStatus === orderToUpdate?.status
                    }
                ]}
            >
                <p>Current Status: <span className={`status-badge ${orderToUpdate?.status}`}>{orderToUpdate?.status}</span></p>
                <div style={{ marginTop: '15px' }}>
                    <label htmlFor="new-status-select" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Select New Status:
                    </label>
                    <select
                        id="new-status-select"
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
                    >
                        {ORDER_STATUSES.map(status => (
                            <option key={status} value={status}>
                                {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                            </option>
                        ))}
                    </select>
                </div>

                {updateStatus === 'success' && (
                    <div style={{ color: 'green', marginTop: '10px' }}>
                        Order status updated successfully!
                    </div>
                )}
                {updateStatus === 'error' && (
                    <div style={{ color: 'red', marginTop: '10px' }}>
                        Failed to update order status. Please try again.
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default Orders;