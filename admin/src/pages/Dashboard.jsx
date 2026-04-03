import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'

const Dashboard = ({ token }) => {
  const [dashboardData, setDashboardData] = useState({
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
    totalRevenue: 0,
    recentOrders: [],
    topProducts: [],
    monthlyStats: [],
    userGrowth: [],
    orderStatusBreakdown: {}
  })
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('7d') // 7d, 30d, 90d

  const fetchDashboardData = async () => {
    if (!token) return null

    try {
      setLoading(true)
      
      // Fetch orders data
      const ordersResponse = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
      const usersResponse = await axios.post(backendUrl + '/api/user/list', {}, { headers: { token } })
      const productsResponse = await axios.get(backendUrl + '/api/product/list')
      
      if (ordersResponse.data.success && usersResponse.data.success && productsResponse.data.success) {
        const orders = ordersResponse.data.orders
        const users = usersResponse.data.users
        const products = productsResponse.data.products

        // Calculate dashboard metrics
        const totalOrders = orders.length
        const totalUsers = users.length
        const totalProducts = products.length
        const totalRevenue = orders
          .filter(order => order.payment === true)
          .reduce((sum, order) => sum + order.amount, 0)

        // Recent orders (last 5)
        const recentOrders = orders
          .sort((a, b) => b.date - a.date)
          .slice(0, 5)
          .map(order => ({
            id: order._id.slice(-8),
            amount: order.amount,
            status: order.status,
            date: new Date(order.date).toLocaleDateString(),
            customer: order.address?.fullName || 'Unknown'
          }))

        // Top selling products
        const productSales = {}
        orders.forEach(order => {
          if (order.payment === true) {
            order.items.forEach(item => {
              const product = products.find(p => p._id === item._id)
              if (product) {
                if (!productSales[product.name]) {
                  productSales[product.name] = { name: product.name, sales: 0, revenue: 0 }
                }
                productSales[product.name].sales += item.quantity || 1
                productSales[product.name].revenue += item.price * (item.quantity || 1)
              }
            })
          }
        })

        const topProducts = Object.values(productSales)
          .sort((a, b) => b.sales - a.sales)
          .slice(0, 5)

        // Order status breakdown
        const orderStatusBreakdown = orders.reduce((acc, order) => {
          acc[order.status] = (acc[order.status] || 0) + 1
          return acc
        }, {})

        setDashboardData({
          totalOrders,
          totalUsers,
          totalProducts,
          totalRevenue,
          recentOrders,
          topProducts,
          orderStatusBreakdown
        })
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      toast.error('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [token])

  const StatCard = ({ title, value, icon, color = 'blue' }) => (
    <div className='bg-white rounded-lg shadow p-6 border-l-4 border-blue-500'>
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-sm text-gray-600 mb-1'>{title}</p>
          <p className='text-2xl font-bold text-gray-900'>{value}</p>
        </div>
        <div className={`text-3xl opacity-20`}>{icon}</div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='text-gray-500'>Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div>
      <div className='mb-8'>
        <h3 className='text-2xl font-bold text-gray-900'>Dashboard</h3>
        <p className='text-gray-600 mt-1'>Welcome back! Here's what's happening with your store today.</p>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        <StatCard 
          title="Total Orders" 
          value={dashboardData.totalOrders} 
          icon="📦" 
          color="blue" 
        />
        <StatCard 
          title="Total Users" 
          value={dashboardData.totalUsers} 
          icon="👥" 
          color="green" 
        />
        <StatCard 
          title="Total Products" 
          value={dashboardData.totalProducts} 
          icon="🎨" 
          color="purple" 
        />
        <StatCard 
          title="Total Revenue" 
          value={`${currency}${dashboardData.totalRevenue.toLocaleString()}`} 
          icon="💰" 
          color="yellow" 
        />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
        {/* Recent Orders */}
        <div className='bg-white rounded-lg shadow'>
          <div className='p-6 border-b'>
            <h4 className='text-lg font-semibold text-gray-900'>Recent Orders</h4>
          </div>
          <div className='p-6'>
            {dashboardData.recentOrders.length > 0 ? (
              <div className='space-y-4'>
                {dashboardData.recentOrders.map((order, index) => (
                  <div key={index} className='flex items-center justify-between p-3 bg-gray-50 rounded'>
                    <div>
                      <p className='font-medium text-gray-900'>#{order.id}</p>
                      <p className='text-sm text-gray-600'>{order.customer}</p>
                      <p className='text-xs text-gray-500'>{order.date}</p>
                    </div>
                    <div className='text-right'>
                      <p className='font-medium text-gray-900'>{currency}{order.amount}</p>
                      <span className={`text-xs px-2 py-1 rounded ${
                        order.status === 'Order Placed' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' :
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-gray-500 text-center py-8'>No recent orders</p>
            )}
          </div>
        </div>

        {/* Order Status Breakdown */}
        <div className='bg-white rounded-lg shadow'>
          <div className='p-6 border-b'>
            <h4 className='text-lg font-semibold text-gray-900'>Order Status</h4>
          </div>
          <div className='p-6'>
            <div className='space-y-4'>
              {Object.entries(dashboardData.orderStatusBreakdown).map(([status, count]) => (
                <div key={status} className='flex items-center justify-between'>
                  <span className='text-gray-700 capitalize'>{status}</span>
                  <div className='flex items-center gap-2'>
                    <div className='w-32 bg-gray-200 rounded-full h-2'>
                      <div 
                        className='bg-blue-500 h-2 rounded-full' 
                        style={{ width: `${(count / dashboardData.totalOrders) * 100}%` }}
                      ></div>
                    </div>
                    <span className='font-medium text-gray-900 w-12 text-right'>{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className='bg-white rounded-lg shadow'>
        <div className='p-6 border-b'>
          <h4 className='text-lg font-semibold text-gray-900'>Top Selling Products</h4>
        </div>
        <div className='p-6'>
          {dashboardData.topProducts.length > 0 ? (
            <div className='space-y-4'>
              {dashboardData.topProducts.map((product, index) => (
                <div key={index} className='flex items-center justify-between p-3 bg-gray-50 rounded'>
                  <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-800'>
                      {index + 1}
                    </div>
                    <div>
                      <p className='font-medium text-gray-900'>{product.name}</p>
                      <p className='text-sm text-gray-600'>{product.sales} units sold</p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='font-medium text-gray-900'>{currency}{product.revenue.toLocaleString()}</p>
                    <p className='text-sm text-gray-600'>Revenue</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className='text-gray-500 text-center py-8'>No sales data available</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
