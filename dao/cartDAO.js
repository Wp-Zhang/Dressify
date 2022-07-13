import mongodb from "mongodb";

let cartCollection;

export default class CartDAO {
    static async injectDB(conn) {
        if (cartCollection) {
            return;
        }
        try {
            cartCollection = await conn.db(process.env.DRESSIFY_NS).collection('cart');
        } catch (e) {
            console.error(`Unable to connect in CartDAO: ${e}`);
        }
    }

    static async updateCart(userId, cart) {
        console.log(cart)
        try {
            const updateResponse = await cartCollection.updateOne(
                { _id: userId },
                { $set: { cart: cart } },
                { upsert: true }
            )
            return updateResponse
        } catch (e) {
            console.error(`Unable to update cart: ${e}`);
            return { error: e };
        }
    }

    static async getCartById(id) {
        let cursor;
        try {
            cursor = await cartCollection.find({ _id: id });
            const cart = await cursor.toArray();
            return cart[0];
        } catch (e) {
            console.error(`Something went wrong in getCart: ${e}`);
            throw e;
        }
    }
}