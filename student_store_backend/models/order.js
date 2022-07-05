const db = require("../db")
const { BadRequestError, NotFoundError } = require("../utils/errors")


class Order {
    static async listOrdersForUser(user) {
        // returns all orders that the authenticated user has created
        const results = await db.query(
            `
                SELECT  o.id,
                        o.customer_id AS "customerId",
                        o.created_at AS "createdAt"
                FROM orders AS o
                WHERE o.id == $1
                ORDER BY o.created_at DESC
            `, [user.id]
        )

        return results.rows
    }
    static async createOrder(order) {
        // takes the users order and stores it into the database
        const requiredFields = ["user.id"]
        const results = await db.query(
            `
                INSERT INTO orders (user_id)
                VALUES ($1, SELECT id FROM users WHERE email = $2)
                RETURNING   id,
                            customer_id,
                            created_at
            `, [user.id]
        )
        return results.rows[0]
    }
}

module.exports = Order