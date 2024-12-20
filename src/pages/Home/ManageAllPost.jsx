import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';  // Assuming you are using axios for API calls
import useAxiosPublic from '../../Hook/useAxiosPublic';
import toast from 'react-hot-toast';

const ManageAllPost = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const axiosPublic = useAxiosPublic()
    const authToken = localStorage.getItem("authToken");

    // Fetch all posts on component mount
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axiosPublic.get('/api/blogs');
                setPosts(response.data.data); // Assuming the response contains a list of posts
            } catch (err) {
                setError("Failed to fetch posts");
            } finally {
                setLoading(false);
            }
        };
        if (authToken) {
            fetchPosts(); // Proceed to fetch only if there's a valid auth token
        } else {
            setError("No authentication token found.");
            setLoading(false);
        }
    }, [authToken]);

    // Handle delete post functionality
    const handleDeletePost = async (postId) => {
        try {
            const res = await axiosPublic.delete(`/api/admin/blogs/${postId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`, // Include auth token for authorization
                },
            });
            toast.success('The blog has been successfully deleted.');
            setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId)); // Remove the deleted post from the state
        } catch (err) {
            setError("Failed to delete post");
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
            <h1 className="text-3xl font-bold mb-6">Manage All Posts</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <div key={post._id} className="card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl border-2 transition">
                        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                        <p className="text-sm text-gray-500 mb-4">{post.content}</p>
                        <p className="text-sm text-gray-500 mb-2">Posted by: <span className="font-bold">{post.author.name}</span></p>
                        <button
                            onClick={() => handleDeletePost(post._id)}
                            className="btn btn-danger rounded-full hover:bg-red-700 hover:text-white"
                        >
                            Delete Post
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

ManageAllPost.propTypes = {
    posts: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
        })
    ),
};

export default ManageAllPost;
