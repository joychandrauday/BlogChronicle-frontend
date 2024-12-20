import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hook/useAxiosPublic";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const axioPublic = useAxiosPublic()
    const handleLogin = async (e) => {

        e.preventDefault();
        setError(""); // Clear any previous errors

        try {
            // Replace the URL with your API endpoint
            const response = await axioPublic.post("/api/auth/login", {
                email,
                password
            });
            // Handle success (e.g., store user token in localStorage)
            if (response.data.data.token) {
                localStorage.setItem("authToken", response.data.data.token);
                navigate("/"); // Navigate to the homepage after login
                location.reload();
            } else {
                setError("Invalid credentials, please try again.");
            }
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred during login.");
        }
    };

    return (
        <div className="container mx-auto p-6">
            <div className="max-w-md mx-auto shadow p-6 rounded-lg">
                <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold">Email</label>
                        <input
                            type="email"
                            className="input input-bordered w-full rounded-full"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold">Password</label>
                        <input
                            type="password"
                            className="input input-bordered w-full rounded-full"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-full rounded-full">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
