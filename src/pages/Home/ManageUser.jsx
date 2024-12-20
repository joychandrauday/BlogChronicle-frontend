import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useAxiosPublic from '../../Hook/useAxiosPublic'; // Assuming you have a hook for axios requests

const ManageUser = () => {
    const axiosPublic = useAxiosPublic();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const authToken = localStorage.getItem("authToken"); // Ensure this token is retrieved correctly

    // Fetch all users on component mount
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosPublic.get('/api/users', {
                    headers: {
                        Authorization: `Bearer ${authToken}`, // Ensure you're passing the Bearer token in the correct format
                    },
                });
                setUsers(response.data.data); // Assuming the API returns a list of users
            } catch (err) {
                setError("Failed to fetch users");
            } finally {
                setLoading(false);
            }
        };

        if (authToken) {
            fetchUsers(); // Proceed to fetch only if there's a valid auth token
        } else {
            setError("No authentication token found.");
            setLoading(false);
        }
    }, [authToken]);

    // Handle block user functionality
    const handleBlockUser = async (userId) => {
        try {
            // Ensure you pass the Authorization header in the correct format
            const res = await axiosPublic.patch(
                `/api/admin/users/${userId}/block`,
                {}, // Assuming no body data is required, but modify accordingly
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`, // Pass the Bearer token here
                    }
                }
            );
            console.log(res);
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === userId ? { ...user, isBlocked: true } : user
                )
            );
        } catch (err) {
            setError("Failed to block user");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Manage Users</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user) => (
                    <div
                        key={user._id}
                        className="card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl border-2 transition"
                    >
                        <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
                        <p className="text-sm text-gray-500 mb-4">{user.email}</p>
                        <p className="text-sm text-gray-700 mb-4">
                            {user.isBlocked ? "Blocked" : "Active"}
                        </p>
                        <button
                            onClick={() => handleBlockUser(user._id)}
                            className={`btn ${user.isBlocked ? "btn-secondary" : "btn-danger"} rounded-full hover:bg-red-700 hover:text-white`}
                            disabled={user.isBlocked}
                        >
                            {user.isBlocked ? "Blocked" : "Block User"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

ManageUser.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            isBlocked: PropTypes.bool.isRequired,
        })
    ),
};

export default ManageUser;
