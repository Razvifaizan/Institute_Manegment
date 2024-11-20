import axios from "axios";

class WebService {
    // Existing methods...

    getAPI(url) {
        return axios.post(url, {});
    }

    postAPI(url, data) {
        return axios.post(url, data);
    }

    postAPIs(url, token) {
        return axios.post(url, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    putAPIs(url, token) {
        return axios.put(url, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    postAPICall(url, token, data) {
        return axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    getAPICall(url, token) {
        return axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    putAPICall(url, token, data) {
        return axios.put(url, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    // New deleteAPICall method
    deleteAPICall(url, token) {
        return axios.delete(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
}

export default new WebService();
