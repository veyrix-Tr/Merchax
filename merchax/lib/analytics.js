import { connectDB } from '@/lib/db';
import Product from '@/models/Product';

// Generate mock sales data for the last 6 months
function generateSalesData() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  return months.map((month, index) => ({
    month,
    sales: Math.floor(Math.random() * 5000) + 2000 + (index * 500),
    orders: Math.floor(Math.random() * 100) + 50 + (index * 10)
  }));
}

// Generate stock distribution data by category
function generateStockDistribution(products) {
  const categoryStock = {};
  
  products.forEach(product => {
    if (!categoryStock[product.category]) {
      categoryStock[product.category] = 0;
    }
    categoryStock[product.category] += product.stock;
  });

  return Object.entries(categoryStock).map(([category, stock]) => ({
    category,
    stock,
    percentage: 0 // Will be calculated
  }));
}

// Calculate total stock value
function calculateTotalStockValue(products) {
  return products.reduce((total, product) => {
    return total + (product.price * product.stock);
  }, 0);
}

// Get dashboard analytics
export async function getDashboardAnalytics() {
  try {
    await connectDB();
    
    // Fetch all products
    const products = await Product.find({});
    
    // Calculate metrics
    const totalProducts = products.length;
    const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
    const totalValue = calculateTotalStockValue(products);
    const lowStockItems = products.filter(product => product.stock < 10).length;
    
    // Generate chart data
    const salesData = generateSalesData();
    const stockDistribution = generateStockDistribution(products);
    
    // Calculate percentages for stock distribution
    const totalStockForDistribution = stockDistribution.reduce((sum, item) => sum + item.stock, 0);
    stockDistribution.forEach(item => {
      item.percentage = totalStockForDistribution > 0 ? Math.round((item.stock / totalStockForDistribution) * 100) : 0;
    });
    
    // Category counts
    const categoryCounts = {};
    products.forEach(product => {
      categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1;
    });
    
    return {
      summary: {
        totalProducts,
        totalStock,
        totalValue: Math.round(totalValue * 100) / 100,
        lowStockItems,
        totalCategories: Object.keys(categoryCounts).length
      },
      charts: {
        sales: salesData,
        stockDistribution
      },
      categories: categoryCounts
    };
  } catch (error) {
    console.error('Error fetching dashboard analytics:', error);
    throw new Error('Failed to fetch dashboard analytics');
  }
}
