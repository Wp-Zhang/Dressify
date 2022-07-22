import mongodb from "mongodb";

let ordersCollection;

export default class OrdersDAO {
    static async injectDB(conn) {
        if (ordersCollection) {
            return;
        }
        try {
            ordersCollection = await conn.db(process.env.DRESSIFY_NS).collection('orders');
        } catch (e) {
            console.error(`Unable to connect in OrdersDAO: ${e}`);
        }
    }

    static async addOrder(order) {
        try {
            const newOrderId = await this.getNewOrderId()
            order["order_id"] = newOrderId
            order['t_dat'] = new Date(Date.now());
            const addResponse = await ordersCollection.insertOne(order)
            return addResponse
        } catch (e) {
            console.error(`Unable to add order: ${e}`);
            return { error: e };
        }
    }

    static async deleteOrder(orderId) {
        try {
            console.log("Deleting ...", orderId)
            const deleteResponse = await ordersCollection.deleteOne(
                { order_id: orderId }
            )
            return deleteResponse
        } catch (e) {
            console.error(`Unable to delete order: ${e}`);
            return { error: e };
        }
    }

    static async getOrdersById(id) {
        let cursor;
        try {
            cursor = await ordersCollection.find({ customer_id: id });
            const orders = await cursor.toArray();
            return orders;
        } catch (e) {
            console.error(`Something went wrong in getOrders: ${e}`);
            throw e;
        }
    }

    static async getNewOrderId() {
        try {
            let cursor = await ordersCollection.find().sort({ order_id: -1 }).limit(1);
            const latestOrder = await cursor.toArray();
            let newOrderId;
            if (latestOrder[0]) {
                newOrderId = latestOrder[0].order_id;
            } else {
                newOrderId = 0
            }
            console.log("Max order_id:", newOrderId);
            return newOrderId + 1;
        } catch (e) {
            console.error(`Something went wrong in getNewOrderId: ${e}`);
            throw e;
        }
    }
}