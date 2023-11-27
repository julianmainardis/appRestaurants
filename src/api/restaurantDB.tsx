import axios from 'axios';

const restaurantDB = axios.create({
    baseURL: 'https://us-central1-my-project-1508621774312.cloudfunctions.net/app',
    // params: {
    //     api_key: 'ddb5fc958ad78a07928f6ff188d86724',
    //     language: 'es-ES'
    // }
});

export default restaurantDB;
