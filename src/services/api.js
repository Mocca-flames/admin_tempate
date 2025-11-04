import axios from "axios";

/**
 * API SERVICE - Central place for all API calls
 * This is the EASIEST way to handle API requests
 *
 * HOW TO USE:
 * 1. Change BASE_URL to your API endpoint
 * 2. Add your API functions below
 * 3. Import and use in your components
 */

// CHANGE THIS to your API URL
const BASE_URL = "https://api.example.com";

// Create axios instance with default settings
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds
});

// Add authorization token to all requests (if needed)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

/**
 * API FUNCTIONS
 * Add your API calls here
 */

// Example: Get all users
export const getUsers = async () => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Example: Get single user
export const getUser = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

// Example: Create user
export const createUser = async (userData) => {
  try {
    const response = await api.post("/users", userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Example: Update user
export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

// Example: Delete user
export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// Example: Get dashboard stats
export const getDashboardStats = async () => {
  try {
    const response = await api.get("/dashboard/stats");
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw error;
  }
};

// Mock API functions for demonstration (remove when connecting to real API)
export const getMockDashboardStats = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return {
    totalUsers: 1234,
    totalRevenue: 45678,
    activeOrders: 89,
    growth: 12.5
  };
};

export const getMockUsers = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));

  return [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', joined: '2024-01-15', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'active', joined: '2024-01-14', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'pending', joined: '2024-01-13', role: 'User' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', status: 'active', joined: '2024-01-12', role: 'Moderator' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', status: 'inactive', joined: '2024-01-11', role: 'User' },
  ];
};

export const getMockChartData = async () => {
  await new Promise(resolve => setTimeout(resolve, 400));

  return {
    userGrowth: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'New Users',
        data: [65, 89, 80, 81, 96, 105],
        borderColor: 'var(--primary-color)',
        backgroundColor: 'var(--primary-light)',
        tension: 0.4,
      }]
    },
    revenue: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Revenue ($)',
        data: [2800, 3200, 2900, 3500, 3800, 4200],
        borderColor: 'var(--success)',
        backgroundColor: 'var(--success-light)',
        tension: 0.4,
      }]
    }
  };
};

export const getMockNotifications = async () => {
  await new Promise(resolve => setTimeout(resolve, 200));

  return [
    { id: 1, type: 'info', message: 'New user registered', time: '2 min ago' },
    { id: 2, type: 'warning', message: 'Server maintenance scheduled', time: '1 hour ago' },
    { id: 3, type: 'success', message: 'Payment processed successfully', time: '3 hours ago' },
  ];
};

/**
 * FOR SCHOOL SYSTEM - Add these:
 * - getStudents, getStudent, createStudent, updateStudent, deleteStudent
 * - getTeachers, getTeacher, createTeacher, updateTeacher, deleteTeacher
 * - getClasses, getClass, createClass, updateClass, deleteClass
 * - getGrades, createGrade, updateGrade
 *
 * FOR UBER/BOLT ADMIN - Add these:
 * - getDrivers, getDriver, createDriver, updateDriver, deleteDriver
 * - getRiders, getRider, createRider, updateRider, deleteRider
 * - getTrips, getTrip, updateTrip
 * - getEarnings, getAnalytics
 *
 * FOR MINING ADMIN - Add these:
 * - getMiners, getMiner, createMiner, updateMiner, deleteMiner
 * - getEquipment, getEquipmentItem, createEquipment, updateEquipment
 * - getProduction, createProductionRecord
 * - getSafetyReports, createSafetyReport
 */

export default api;
