import axios from "axios";

class CategoryDataService {
    getSections(index) {
        if (index === "All") {
            index = undefined
        }
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/category/section`, { params: { index: index } });
    }

    getTypes(index, section) {
        if (index === "All") {
            index = undefined
        }
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/category/type`, { params: { index: index, section: section } });
    }
}

export default new CategoryDataService();