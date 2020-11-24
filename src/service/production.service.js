import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:14338/";


class ProductionService {
    
   getAllProduct() {
        return axios.get(API_URL + 'api/Productions', { headers: authHeader() });
    }

    getSinglepProduct(id) {
        return axios.get(API_URL + 'api/Productions/' + id, { headers: authHeader() });
    }

    updateProduct(item) {
        return axios.put(API_URL + 'api/Productions/' + item.id, item, { headers: authHeader() });
    }

    insertProduct(item) {
        return axios.post(API_URL + 'api/Productions/', item, { headers: authHeader() });
    }

    deleteProduct(id) {
        return axios.delete(API_URL + 'api/Productions/' + id, { headers: authHeader() });
    }

}

export default new ProductionService();