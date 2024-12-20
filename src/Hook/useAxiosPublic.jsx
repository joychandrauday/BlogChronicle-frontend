import axios from 'axios';

const useAxiosPublic = () => {
    const axiosInstance = axios.create({
        // baseURL: import.meta.env.API_URL
        // baseURL: 'http://localhost:3000'
        baseURL: 'https://blog-chronicle-backend.vercel.app'
    });

    return axiosInstance;
};

export default useAxiosPublic;
