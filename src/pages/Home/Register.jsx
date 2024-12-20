import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hook/useAxiosPublic";
const Register = () => {
    const axiosPublic = useAxiosPublic()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();



        try {
            // Clear any previous errors
            setError("");

            // Send registration data to the API
            const response = await axiosPublic.post("/api/auth/register", {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });

            // Handle success
            if (response.status === 201) {
                alert("Registration successful!");
                navigate("/login"); // Redirect to login page after registration
            }
        } catch (err) {
            setError(
                err.response?.data?.message || "An error occurred during registration."
            );
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Register</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                {/* Name Field */}
                <div>
                    <label className="block text-sm font-semibold mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="input input-bordered w-full rounded-full"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Email Field */}
                <div>
                    <label className="block text-sm font-semibold mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="input input-bordered w-full rounded-full"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Password Field */}
                <div>
                    <label className="block text-sm font-semibold mb-1">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="input input-bordered w-full rounded-full"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="btn btn-primary w-full rounded-full mt-4"
                >
                    Register
                </button>
            </form>

            {/* Login Redirect */}
            <p className="text-center text-sm text-gray-500 mt-4">
                Already have an account?{" "}
                <a href="/login" className="text-blue-600 hover:underline">
                    Login here
                </a>
            </p>
        </div>
    );
};

export default Register;
