import axios from 'axios';


const APIBase = (props) => {
    // Request Configuration
    const configuration = {
        method: props.method,
        url: props.url,
        baseURL: import.meta.env.VITE_ENVIRONMENT === "Production" ? "https://soup-ankas-backend.onrender.com" : "http://localhost:8000",
        headers: { 
            'Content-Type': 'application/json',
        },
        withCredentials: true,
        credentials: 'include'
    }

    // Request Data
    if (props.method === "POST" || props.method === "PUT") {
        configuration.data = props.data;
    }

    // Request Params
    if (props.method === "GET") {
        configuration.params = props.params;
    }

    // Return Request
    return axios(configuration)
}

export default APIBase
