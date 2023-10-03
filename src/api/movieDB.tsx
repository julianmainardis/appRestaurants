import axios from 'axios';

const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: 'ddb5fc958ad78a07928f6ff188d86724',
        language: 'es-ES'
    }
});

export default movieDB;
