import axios from "axios";

let rawUrl = (import.meta.env.VITE_API_URL || "").trim();
if (rawUrl && !rawUrl.startsWith("http://") && !rawUrl.startsWith("https://")) {
    rawUrl = `https://${rawUrl}`;
}
rawUrl = rawUrl.replace(/\/+$/, "");

const API = axios.create({
    baseURL: rawUrl ? `${rawUrl}/api` : "/api",
});

// Otomatis menyisipkan Token JWT ke setiap request jika user sudah login
API.interceptors.request.use((config) => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
        const { token } = JSON.parse(userInfo);
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Menangani respon error 401 (token expired / invalid) untuk logout otomatis
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            const isLoginRequest = error.config && error.config.url && error.config.url.includes("/auth/login");
            if (!isLoginRequest) {
                localStorage.removeItem("userInfo");
                window.location.href = "/";
            }
        }
        return Promise.reject(error);
    }
);
export default API;
