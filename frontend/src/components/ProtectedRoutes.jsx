import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
    // get user and loading from AuthContext
    const { user, loading } = useContext(AuthContext);

    // Wait for auth check to complete
    if (loading) {
        return ( 
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Checking authentication...Please wait.</p>
            </div>
        );
    }
    // if no user, redirect to login
    if (!user) {
        return <Navigate to="/login" />;
    }
    // if user is authenticated, render the child components
    return children;
};

export default ProtectedRoutes;
