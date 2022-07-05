const express = require("express")
const router = express.Router()
const { requireAuthenticatedUser } = require("../middleware/security")

const Order = require("../models/order")

router.get("/", requireAuthenticatedUser, async (req, res, next) => {
    try {
        const user = res.locals.user
        const orders = await Order.listOrdersForUser({user, orders: req.body })
        return res.status(201).json({orders})
    } catch (error) {
        next(error)
    }
})

router.post("/", requireAuthenticatedUser, async (req, res, next) => {
    try {
        const user = res.locals.user
        newOrder = Order.createOrder(req);
        return res.status(200).json({newOrder})
    } catch (error) {
        next(error)
    }
})

module.exports = router