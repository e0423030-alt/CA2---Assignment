/**
 * Validate if order is valid (Q1, Q3 rules)
 * Invalid if:
 * - items array is empty
 * - any item quantity <= 0
 * - totalAmount is invalid
 */
export const isValidOrder = (order) => {
  // Check if items array exists and is not empty
  if (!order.items || !Array.isArray(order.items) || order.items.length === 0) {
    return false;
  }

  // Check if any item has quantity <= 0
  const hasInvalidQuantity = order.items.some((item) => item.quantity <= 0);
  if (hasInvalidQuantity) {
    return false;
  }

  // Check if totalAmount is valid (positive number)
  if (typeof order.totalAmount !== 'number' || order.totalAmount <= 0) {
    return false;
  }

  return true;
};

/**
 * Get all valid orders from dataset
 */
export const getValidOrders = (orders) => {
  return orders.filter(isValidOrder);
};

/**
 * Calculate subtotal for an item (price * quantity)
 */
export const calculateItemSubtotal = (item) => {
  if (!item || !item.price || !item.quantity) return 0;
  return item.price * item.quantity;
};

/**
 * Filter orders by restaurant (case-insensitive)
 */
export const filterOrdersByRestaurant = (orders, restaurantName) => {
  if (!restaurantName.trim()) {
    return [];
  }

  return orders.filter((order) =>
    order.restaurant
      .toLowerCase()
      .includes(restaurantName.toLowerCase())
  );
};

/**
 * Get order statistics using reduce
 */
export const getOrderStats = (orders) => {
  const validOrders = getValidOrders(orders);

  return validOrders.reduce(
    (stats, order) => {
      stats.totalOrders += 1;

      if (order.status && order.status.toLowerCase() === 'delivered') {
        stats.deliveredOrders += 1;
      }

      if (order.status && order.status.toLowerCase() === 'cancelled') {
        stats.cancelledOrders += 1;
      }

      return stats;
    },
    { totalOrders: 0, deliveredOrders: 0, cancelledOrders: 0 }
  );
};
