import api from "../api/axios";
import { createContext, useContext, useState, useEffect } from "react";

// Create AuthContext
export const AuthContext = createContext();

// Create custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // user state
    const [user, setUser] = useState(null);
    // loading state
    const [loading, setLoading] = useState(true);

    // method for login
    const login = async (email, password) => {
        const response = await api.post("/login", { email, password });
        // store token in local storage
        localStorage.setItem("token", response.data.data.token);
        // set user state
        setUser(response.data.data.user);
    };

    // method for register new user
    const register = async (data) => {
        const response = await api.post("/register", data);
        // store token in local storage
        localStorage.setItem("token", response.data.data.token);
        // set user state
        setUser(response.data.data.user);
    };

    // method for Logout
    const logout = async () => {
        try {
            await api.post("/logout");
        } catch (error) {
            console.error("Logout error", error);
        } finally {
            localStorage.removeItem("token");
            setUser(null);
        }
    };

    // check user on refresh
    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const response = await api.get("/user");
                    setUser(response.data.data);
                } catch (error) {
                    console.error("Error fetching user", error);
                    localStorage.removeItem("token");
                } finally {
                    setLoading(false);
                }
            }
        }
        checkUser();
    }, []);

    // return context provider
    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

