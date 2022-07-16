import axios from "axios";

class ProductDataService {
    find(filters, page = 0) {
        if (filters && filters.index === "All") {
            filters.index = undefined
        }
        if (filters && filters.kw === "") {
            filters.kw = undefined
        }
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

    getArticleById(id) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/products/article/id/${id}`);
    }

    getArticleByIds(ids) {
        return Promise.all(ids.map(id => this.getArticleById(id)));
    }
}

export default new ProductDataService();