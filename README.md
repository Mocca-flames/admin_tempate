# Modern Admin Dashboard Template

A clean, modern, and beginner-friendly admin dashboard template built with React and CSS. Perfect for any admin panel: School Management, Uber/Bolt Admin, Mining Operations, E-commerce, and more!

## ✨ Features

- 🎨 Modern, clean design
- 📱 Desktop-optimized (wide layouts)
- 🔧 Easy to customize
- 📦 Modular component structure
- 🚀 Simple API integration with Axios
- 🎯 Beginner-friendly code
- 📊 Ready-to-use components (Tables, Cards, Stats)
- 🎨 CSS Variables for easy theming

## 🚀 Quick Start

### 1. Installation

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`

### 2. Project Structure

```
admin-dashboard/
├── src/
│   ├── components/        # Reusable components
│   │   ├── Sidebar.jsx    # Left navigation
│   │   ├── Header.jsx     # Top bar
│   │   ├── Card.jsx       # Card components
│   │   └── Table.jsx      # Data table
│   ├── layouts/
│   │   └── DashboardLayout.jsx  # Main layout wrapper
│   ├── pages/            # Your pages
│   │   ├── Dashboard.jsx
│   │   ├── Users.jsx
│   │   └── Settings.jsx
│   ├── services/
│   │   └── api.js        # API calls
│   ├── styles/           # CSS files
│   └── App.jsx           # Main app & routing
```

## 🎨 Customization Guide

### Change Colors (Branding)

Edit `src/styles/variables.css`:

```css
:root {
  --primary-color: #4f46e5; /* Your brand color */
  --primary-hover: #4338ca; /* Darker shade */
  --primary-light: #eef2ff; /* Lighter shade */
}
```

### Add New Page

1. **Create page file**: `src/pages/Products.jsx`

```javascript
import React from "react";
import { Card } from "../components/Card";

const Products = () => {
  return (
    <div>
      <h1>Products</h1>
      <Card title="Product List">{/* Your content */}</Card>
    </div>
  );
};

export default Products;
```

2. **Add route** in `src/App.jsx`:

```javascript
import Products from "./pages/Products";

// In Routes:
<Route path="/products" element={<Products />} />;
```

3. **Add navigation** in `src/components/Sidebar.jsx`:

```javascript
{ path: '/products', icon: '📦', label: 'Products' }
```

### Connect to Your API

Edit `src/services/api.js`:

```javascript
// Change base URL
const BASE_URL = "https://your-api.com";

// Add your API function
export const getProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};
```

Use in component:

```javascript
import { getProducts } from '../services/api';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchData();
  }, []);

  return (/* ... */);
};
```

## 📚 Component Usage

### StatCard

```javascript
<StatCard
  icon="👥"
  label="Total Users"
  value="1,234"
  change="+12%"
  positive={true}
  color="primary"
/>
```

### Table

```javascript
const columns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
];

const data = [{ name: "John", email: "john@example.com" }];

<Table
  columns={columns}
  data={data}
  onEdit={(row) => handleEdit(row)}
  onDelete={(row) => handleDelete(row)}
/>;
```

### Card

```javascript
<Card title="My Card">
  <p>Card content here</p>
</Card>
```

## 🎓 Example: School Management System

### Customize Navigation

```javascript
// In Sidebar.jsx
const navItems = [
  {
    section: "Academic",
    items: [
      { path: "/", icon: "📊", label: "Dashboard" },
      { path: "/students", icon: "🎓", label: "Students" },
      { path: "/teachers", icon: "👨‍🏫", label: "Teachers" },
      { path: "/classes", icon: "📚", label: "Classes" },
      { path: "/grades", icon: "📝", label: "Grades" },
    ],
  },
];
```

### Dashboard Stats

```javascript
<StatCard icon="🎓" label="Total Students" value="856" />
<StatCard icon="👨‍🏫" label="Teachers" value="45" />
<StatCard icon="📚" label="Classes" value="32" />
<StatCard icon="📝" label="Avg Grade" value="B+" />
```

### API Functions

```javascript
// In api.js
export const getStudents = async () => {
  return await api.get("/students");
};

export const getStudent = async (id) => {
  return await api.get(`/students/${id}`);
};

export const createStudent = async (data) => {
  return await api.post("/students", data);
};
```

## 🚗 Example: Uber/Bolt Admin

### Navigation

```javascript
const navItems = [
  {
    section: "Operations",
    items: [
      { path: "/", icon: "📊", label: "Dashboard" },
      { path: "/drivers", icon: "🚗", label: "Drivers" },
      { path: "/riders", icon: "👤", label: "Riders" },
      { path: "/trips", icon: "🗺️", label: "Trips" },
      { path: "/earnings", icon: "💰", label: "Earnings" },
    ],
  },
];
```

### Dashboard Stats

```javascript
<StatCard icon="🚗" label="Active Drivers" value="234" />
<StatCard icon="👤" label="Total Riders" value="1,234" />
<StatCard icon="🗺️" label="Today's Trips" value="567" />
<StatCard icon="💰" label="Revenue" value="$12,345" />
```

## ⛏️ Example: Mining Admin

### Navigation

```javascript
const navItems = [
  {
    section: "Operations",
    items: [
      { path: "/", icon: "📊", label: "Dashboard" },
      { path: "/miners", icon: "⛏️", label: "Miners" },
      { path: "/equipment", icon: "🚜", label: "Equipment" },
      { path: "/production", icon: "📦", label: "Production" },
      { path: "/safety", icon: "🦺", label: "Safety" },
    ],
  },
];
```

###
