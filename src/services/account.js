import axios from "axios";

class AccountDataService {
    getFavorites(uid) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/account/favorites/id/` + uid);
    }

    updateFavorites(data) {
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/account/favorites`, data);
    }
}

export default new AccountDataService();