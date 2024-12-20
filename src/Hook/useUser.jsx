import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import useAxiosPublic from "./useAxiosPublic";

const useUser = () => {
    const axiosPublic = useAxiosPublic()
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const authToken = localStorage.getItem("authToken");
            console.log(authToken);
            // Check if the token exists and is valid
            if (!authToken) {
                setLoading(false);
                return;
            }

            // Ensure the token has all three parts
            const tokenParts = authToken.split(".");
            if (tokenParts.length !== 3) {
                setError("Invalid token structure. Missing parts.");
                setLoading(false);
                return;
            }
            const decodedToken = jwtDecode(authToken);
            const userId = decodedToken.id; // Adjust based on your token structure
            console.log(userId);
            try {
                // Decode token to get the user ID

                // Fetch user data from the backend
                const response = await axiosPublic.get(`/api/users/${userId}`);
                console.log(response);

                setUser(response.data.data); // Update state with user data
            } catch (error) {
                console.error("Failed to fetch user:", error);
                setError(error); // Set error if fetching fails
                setUser(null); // Clear user if fetching fails
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { user, loading, error };
};

export default useUser;
