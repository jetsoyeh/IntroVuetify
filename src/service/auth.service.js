import axios  from 'axios';

const API_URL = "http://localhost:14338/";

class AuthService {
    login(user){
        return axios.post(API_URL + "api/ApplicationUser/login",user)
        .then(response=>{
            if(response.data){
                sessionStorage.setItem('token',JSON.stringify(response.data));
            }
            return response.data;
        })
    }

    logout(){
        sessionStorage.removeItem('token');
    }

    register(user){
        return axios.post(API_URL+'api/ApplicationUser/Register',user);
    }

}

export default new AuthService();