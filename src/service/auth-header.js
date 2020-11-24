export default function authHeader(){
    let user = JSON.parse(sessionStorage.getItem('token'));

    if(user){
        return {'Authorization': 'Bearer ' + user.token};
    }else{
        return{};
    }

}