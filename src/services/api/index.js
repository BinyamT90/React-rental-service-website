import axios from 'axios';
const local = 'http://localhost:5000';
const localMobile = 'http://192.168.1.101/:5000';

const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);

    if (userToken) {
        return userToken.token
    } else {
        return ''
    }
};
const backEndApi = axios.create({
    baseURL : local,
    headers: {
        'x-access-token': getToken()
    }
});

export default backEndApi;
