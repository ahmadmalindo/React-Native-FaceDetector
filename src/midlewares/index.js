import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default async () => {

    const storage = AsyncStorage

    axios.interceptors.request.use(
        async config => {
            const session = await storage.getItem("token");
            if (session !== null) {     
                config.headers['auth'] = `${session}`;
                config.headers['Content-Type'] = 'application/json';
            } else {
                config.headers['Content-Type'] = 'application/json';
            }

            return config;
        },
        err => Promise.reject(err),
    );
};
