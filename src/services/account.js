import axios from "axios";

class AccountDataService {
    getFavorites(uid) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/account/favorites/id/` + uid);
    }

    updateFavorites(data) {
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/account/favorites`, data);
    }

    getCart(uid) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/account/cart/id/` + uid);
    }

    updateCart(data) {
        data.cart = data.cart.filter((article) => article.num > 0)
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/account/cart`, data);
    }

    getOrders(uid) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/account/order/id/` + uid);
    }

    addOrder(order) {
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/account/order`, { order: order });
    }

    delOrder(orderId) {
        return axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/v1/account/order`, orderId);
    }
}

export default new AccountDataService();