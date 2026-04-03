import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe'
import Razorpay from 'razorpay'
import crypto from 'crypto'

// global variables
const currency = 'inr'
const deliveryCharge = 10

// gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const razorpayInstance = new Razorpay({
    key_id:     process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

// ---------------------------------------------------------------------------
// COD
// ---------------------------------------------------------------------------
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body
        const newOrder = new orderModel({ userId, items, address, amount, paymentMethod: "COD", payment: false, date: Date.now() })
        await newOrder.save()
        await userModel.findByIdAndUpdate(userId, { cartData: {} })
        res.json({ success: true, message: "Order Placed" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// ---------------------------------------------------------------------------
// Stripe
// ---------------------------------------------------------------------------
const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body
        const { origin } = req.headers
        const newOrder = new orderModel({ userId, items, address, amount, paymentMethod: "Stripe", payment: false, date: Date.now() })
        await newOrder.save()

        const line_items = items.map(item => ({
            price_data: { currency, product_data: { name: item.name }, unit_amount: item.price * 100 },
            quantity: item.quantity
        }))
        line_items.push({ price_data: { currency, product_data: { name: 'Delivery Charges' }, unit_amount: deliveryCharge * 100 }, quantity: 1 })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:  `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items, mode: 'payment',
        })
        res.json({ success: true, session_url: session.url })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const verifyStripe = async (req, res) => {
    const { orderId, success, userId } = req.body
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            await userModel.findByIdAndUpdate(userId, { cartData: {} })
            res.json({ success: true })
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// ---------------------------------------------------------------------------
// Razorpay — Step 1: Create Razorpay order
// ---------------------------------------------------------------------------
const placeOrderRazorpay = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body

        // Save to DB first
        const newOrder = new orderModel({
            userId, items, address, amount,
            paymentMethod: "Razorpay", payment: false, date: Date.now()
        })
        await newOrder.save()

        // Create Razorpay order
        const rzpOrder = await razorpayInstance.orders.create({
            amount:   Math.round(amount * 100),  // paise
            currency: 'INR',
            receipt:  newOrder._id.toString()
        })

        console.log('Razorpay order created:', rzpOrder.id, '| DB id:', newOrder._id.toString())

        res.json({ success: true, order: rzpOrder })

    } catch (error) {
        console.log('Razorpay error:', error)
        res.json({ success: false, message: error.message })
    }
}

// ---------------------------------------------------------------------------
// Razorpay — Step 2: Verify signature
// ---------------------------------------------------------------------------
const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

        // HMAC-SHA256 verification
        const expected = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + '|' + razorpay_payment_id)
            .digest('hex')

        if (expected !== razorpay_signature) {
            return res.json({ success: false, message: 'Invalid payment signature' })
        }

        // Get DB orderId from Razorpay receipt
        const rzpOrder = await razorpayInstance.orders.fetch(razorpay_order_id)
        const orderId  = rzpOrder.receipt

        const updatedOrder = await orderModel.findByIdAndUpdate(orderId, { payment: true }, { new: true })
        if (!updatedOrder) return res.json({ success: false, message: 'Order not found' })

        await userModel.findByIdAndUpdate(updatedOrder.userId, { cartData: {} })
        res.json({ success: true, message: 'Payment verified' })

    } catch (error) {
        console.log('Razorpay verify error:', error)
        res.json({ success: false, message: error.message })
    }
}

// ---------------------------------------------------------------------------
// Admin / User helpers
// ---------------------------------------------------------------------------
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        
        // Populate user email for each order
        const ordersWithEmail = await Promise.all(
            orders.map(async (order) => {
                try {
                    console.log('Looking for user with ID:', order.userId)
                    // Try to find user by ID (handle both string and ObjectId)
                    let user = null
                    if (order.userId) {
                        user = await userModel.findById(order.userId)
                        // If not found, try to convert to ObjectId and search again
                        if (!user) {
                            const { ObjectId } = await import('mongoose')
                            if (ObjectId.isValid(order.userId)) {
                                user = await userModel.findById(new ObjectId(order.userId))
                            }
                        }
                    }
                    console.log('Found user:', user ? user.email : 'Not found')
                    return {
                        ...order.toObject(),
                        userEmail: user ? user.email : 'N/A'
                    }
                } catch (err) {
                    console.log('Error finding user:', err.message)
                    return {
                        ...order.toObject(),
                        userEmail: 'N/A'
                    }
                }
            })
        )
        
        res.json({ success: true, orders: ordersWithEmail })
    } catch (error) {
        console.log(error); res.json({ success: false, message: error.message })
    }
}

const userOrders = async (req, res) => {
    try {
        const { userId } = req.body
        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error); res.json({ success: false, message: error.message })
    }
}

const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: 'Status Updated' })
    } catch (error) {
        console.log(error); res.json({ success: false, message: error.message })
    }
}

const updatePayment = async (req, res) => {
    try {
        const { orderId } = req.body
        const updatedOrder = await orderModel.findByIdAndUpdate(orderId, { payment: true }, { new: true })
        if (!updatedOrder) return res.json({ success: false, message: 'Order not found' })
        await userModel.findByIdAndUpdate(updatedOrder.userId, { cartData: {} })
        res.json({ success: true, message: 'Payment updated' })
    } catch (error) {
        console.log(error); res.json({ success: false, message: error.message })
    }
}

const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.body
        const deletedOrder = await orderModel.findByIdAndDelete(orderId)
        if (!deletedOrder) return res.json({ success: false, message: 'Order not found' })
        res.json({ success: true, message: 'Order deleted successfully' })
    } catch (error) {
        console.log(error); res.json({ success: false, message: error.message })
    }
}

export { placeOrder, placeOrderStripe, placeOrderRazorpay, verifyStripe, verifyRazorpay, allOrders, userOrders, updateStatus, updatePayment, deleteOrder }