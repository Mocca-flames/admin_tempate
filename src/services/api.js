import axios from "axios";

const BASE_URL = "https://2642240ecf9e.ngrok-free.app/api/admin";
const ADMIN_KEY = "Maurice@12!";

// Create axios instance with ngrok skip header
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

// 1. Get all orders
export const getAllOrders = async () => {
  console.log(
    "Sending GET request to:",
    `${BASE_URL}/orders?admin_key=${ADMIN_KEY}`
  );
  const response = await api.get(`/orders?admin_key=${ADMIN_KEY}`);
  return response.data;
};

// 2. Create order
export const createOrder = async (orderData) => {
  console.log(
    "Sending POST request to:",
    `${BASE_URL}/orders?admin_key=${ADMIN_KEY}`,
    "with data:",
    orderData
  );
  const response = await api.post(`/orders?admin_key=${ADMIN_KEY}`, orderData);
  return response.data;
};

// 3. Update order status
export const updateOrderStatus = async (orderId, newStatus) => {
  console.log(
    "Sending PATCH request to:",
    `${BASE_URL}/orders/${orderId}/status?new_status=${newStatus}&admin_key=${ADMIN_KEY}`
  );
  const response = await api.patch(
    `/orders/${orderId}/status?new_status=${newStatus}&admin_key=${ADMIN_KEY}`
  );
  return response.data;
};

// 4. Get stats summary
export const getStatsSummary = async (days = 30) => {
  console.log(
    "Sending GET request to:",
    `${BASE_URL}/stats/summary?days=${days}&admin_key=${ADMIN_KEY}`
  );
  const response = await api.get(
    `/stats/summary?days=${days}&admin_key=${ADMIN_KEY}`
  );
  return response.data;
};

// 5. Get all drivers
export const getAllDrivers = async () => {
  console.log(
    "Sending GET request to:",
    `${BASE_URL}/drivers?admin_key=${ADMIN_KEY}`
  );
  const response = await api.get(`/drivers?admin_key=${ADMIN_KEY}`);
  return response.data;
};

// 6. Admin create in house Order
export const createInHouseOrder = async (orderData) => {
  console.log(
    "Sending POST request to:",
    `${BASE_URL}/orders/in-house?admin_key=${ADMIN_KEY}`,
    "with data:",
    orderData
  );
  const response = await api.post(
    `/orders/in-house?admin_key=${ADMIN_KEY}`,
    orderData
  );
  return response.data;
};

// 7. Get all Clients
export const getAllClients = async () => {
  console.log(
    "Sending GET request to:",
    `${BASE_URL}/clients?admin_key=${ADMIN_KEY}`
  );
  const response = await api.get(`/clients?admin_key=${ADMIN_KEY}`);
  return response.data;
};

// 8. Delete specific order
export const deleteOrder = async (orderId) => {
  console.log(
    "Sending DELETE request to:",
    `${BASE_URL}/orders/${orderId}?admin_key=${ADMIN_KEY}`
  );
  const response = await api.delete(
    `/orders/${orderId}?admin_key=${ADMIN_KEY}`
  );
  return response.data;
};

// 9. Calculate price preview
export const calculatePricePreview = async (
  distance_km,
  rate_per_km,
  minimum_fare
) => {
  const url =
    `${BASE_URL}/pricing/calculate?distance_km=${distance_km}&admin_key=${ADMIN_KEY}` +
    (rate_per_km ? `&rate_per_km=${rate_per_km}` : "") +
    (minimum_fare ? `&minimum_fare=${minimum_fare}` : "");
  console.log("Sending POST request to:", url);
  const response = await api.post(url.replace(BASE_URL, ""));
  return response.data;
};

// 10. Override order price
export const overrideOrderPrice = async (orderId, newPrice, reason) => {
  const url =
    `${BASE_URL}/orders/${orderId}/price?new_price=${newPrice}&admin_key=${ADMIN_KEY}` +
    (reason ? `&reason=${reason}` : "");
  console.log("Sending PATCH request to:", url);
  const response = await api.patch(url.replace(BASE_URL, ""));
  return response.data;
};
// 11. Search orders
export const searchOrders = async (
  client_email,
  status,
  min_price,
  max_price,
  limit
) => {
  const url =
    `${BASE_URL}/orders/search?admin_key=${ADMIN_KEY}` +
    (client_email ? `&client_email=${client_email}` : "") +
    (status ? `&status=${status}` : "") +
    (min_price ? `&min_price=${min_price}` : "") +
    (max_price ? `&max_price=${max_price}` : "") +
    (limit ? `&limit=${limit}` : "");
  console.log("Sending GET request to:", url);
  const response = await api.get(url.replace(BASE_URL, ""));
  return response.data; // ← Add this!
};

// 12. Driver Availability
export const switchDriverAvailability = async (driver_id) => {
  console.log(
    "Sending POST request to:",
    `${BASE_URL}/drivers/${driver_id}/toggle-availability?admin_key=${ADMIN_KEY}`
  );
  const response = await api.post(
    `/drivers/${driver_id}/toggle-availability?admin_key=${ADMIN_KEY}`
  );
  return response.data;
};

// 13. Apply pricing preset
export const applyPresetPrice = async (preset) => {
  console.log(
    "Sending POST request to:",
    `${BASE_URL}/pricing/preset/${preset}?admin_key=${ADMIN_KEY}`
  );
  const response = await api.post(
    `/pricing/preset/${preset}?admin_key=${ADMIN_KEY}`
  );
  return response.data;
};

// 14. Get priceing presets
export const getPresetPrices = async () => {
  console.log(
    "Sending GET request to:",
    `${BASE_URL}/pricing/presets?admin_key=${ADMIN_KEY}`
  );
  const response = await api.get(`/pricing/presets?admin_key=${ADMIN_KEY}`);
  return response.data;
};

// 15. Create order custom price
export const createCustomPrice = async (orderData, custom_price) => {
  console.log(
    "Sending POST request to:",
    `${BASE_URL}/orders/create-with-custom-price?custom_price=${custom_price}&admin_key=${ADMIN_KEY}`,
    "with data:",
    orderData
  );
  const response = await api.post(
    `/orders/create-with-custom-price?custom_price=${custom_price}&admin_key=${ADMIN_KEY}`,
    orderData
  );
  return response.data;
};

// 16. Order price breakdown
export const getOrderPriceBreakdown = async (order_id) => {
  console.log(
    "Sending GET request to:",
    `${BASE_URL}/orders/${order_id}/price-breakdown?admin_key=${ADMIN_KEY}`
  );
  const response = await api.get(
    `/orders/${order_id}/price-breakdown?admin_key=${ADMIN_KEY}`
  );
  return response.data;
};
