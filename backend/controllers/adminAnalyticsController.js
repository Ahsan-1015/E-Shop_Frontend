const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

// @desc    Get dashboard analytics
// @route   GET /api/admin/analytics
// @access  Private/Admin
const getAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    const revenue = await Order.aggregate([
      {
        $match: { status: { $in: ["delivered", "shipped", "processing"] } }
      },
      {
        $group: { _id: null, total: { $sum: "$total" } }
      }
    ]);

    const totalRevenue = revenue.length > 0 ? revenue[0].total : 0;

    // Monthly stats for the last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyOrders = await Order.aggregate([
      {
        $match: { createdAt: { $gte: sixMonthsAgo } }
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          orders: { $sum: 1 },
          revenue: { $sum: "$total" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Order status breakdown
    const orderStatus = await Order.aggregate([
      {
        $group: { _id: "$status", count: { $sum: 1 } }
      }
    ]);

    res.json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
      monthlyOrders,
      orderStatus,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAnalytics };