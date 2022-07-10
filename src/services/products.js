import axios from "axios";

class ProductDataService {
    getAll(page = 0) {
        console.log("request page:", page);
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/products`, { params: { page: page } });
    }

    find(filters, page = 0) {
        let data = {
            ...filters,
            "page": page
        }
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/products`, { params: data });
    }

    getProductById(id) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/products/id/${id}`);
    }

    getProductByIds(ids) {
        return Promise.all(ids.map(id => this.getProductById(id)));
    }
}

export default new ProductDataService();