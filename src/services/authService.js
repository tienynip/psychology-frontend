
import api from "./api";

export const registerUser = (userData) => {
    return api.post("/api/users/register", userData);
};

export const loginUser = (email, password) => {
    const formData = new URLSearchParams();

    formData.append("username", email.trim());
    formData.append("password", password);

    return api.post("/api/users/token", formData, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });
};

export const getCurrentUser = () => {
    return api.get("/api/users/me");
};


