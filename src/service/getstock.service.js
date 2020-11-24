import axios from 'axios'
import authheader from './auth-header'

const API_URL="http://localhost:14338/";

class getstockservice {

    getData(){
        return axios.get(API_URL+"api/Productions/getdata",{headers: authheader()}); 
    }

    getDay(){
        return axios.get(API_URL+"api/Productions/getday",{headers: authheader()}); 
    }

    getEps(){
        return axios.get(API_URL+"api/Productions/geteps",{headers: authheader()}); 
    }
}

export default new getstockservice