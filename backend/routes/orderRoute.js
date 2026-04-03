import express from 'express'
import { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyStripe, verifyRazorpay, updatePayment, deleteOrder } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

// Admin
orderRouter.post('/list',   adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)
orderRouter.post('/delete', adminAuth, deleteOrder)

// Place order
orderRouter.post('/place',    authUser, placeOrder)
orderRouter.post('/stripe',   authUser, placeOrderStripe)
orderRouter.post('/razorpay', authUser, placeOrderRazorpay)

// Verify
orderRouter.post('/verifyStripe',   authUser, verifyStripe)
orderRouter.post('/verifyRazorpay', authUser, verifyRazorpay)

// User orders
orderRouter.post('/userorders',     authUser, userOrders)
orderRouter.post('/update-payment', authUser, updatePayment)

export default orderRouter