import React, { useState, useEffect } from "react";
import axios from "axios";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import useUser from "../../Hook/useUser";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

const MyPosts = () => {
    const axiosPublic = useAxiosPublic();
    const [myPosts, setMyPosts] = useState([]); // State to store posts
    const [loading, setLoading] = useState(true); // State for loading
    const [error, setError] = useState(null); // State for errors
    const [editPost, setEditPost] = useState(null); // State to store post for editing
    const { user } = useUser();
    const [userId, setUserId] = useState("");
    const authToken = localStorage.getItem("authToken");
    // Fetch posts for the user
    const fetchMyPosts = async () => {
        try {
            const response = await axiosPublic.get(
                `/api/blogs?search=&sortBy=createdAt&sortOrder=desc&filter=${userId}`
            );
            setMyPosts(response.data.data); // Assuming the API response contains an array of posts
        } catch (err) {
            setError("Failed to fetch posts");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            setUserId(user._id); // Set user ID after user is available
        }
    }, [user]);

    useEffect(() => {
        if (userId) {
            fetchMyPosts(); // Fetch posts when the user ID is set
        }
    }, [userId]); // Fetch posts when userId changes

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="spinner"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 font-semibold">
                {error}
            </div>
        );
    }
    // Handle click on edit icon
    const handleEdit = (postId) => {
        const postToEdit = myPosts.find((post) => post._id === postId);
        setEditPost(postToEdit); // Set the post to be edited
    };
    const handleDelete = async (postId) => {
        try {

            // ask for confirmation before deleting
            if (
                window.confirm(
                    "Are you sure you want to delete this post? This action cannot be undone."
                )
            ) {
                await axiosPublic.delete(`/api/blogs/${postId}`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                toast.success('Post deleted successfully!')
                setMyPosts(myPosts.filter((p) => p._id !== postId)); // Remove deleted post from state
            }
        } catch (err) {
            setError("Failed to delete post");
        }
    };
    // handle edit post
    // Handle form submission for editing post
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const updatedPost = {
                title: editPost.title,
                content: editPost.content,
            };

            await axiosPublic.patch(`/api/blogs/${editPost._id}`, updatedPost, {
                headers: {
                    Authorization: `Bearer ${authToken}`, // Add Bearer token in headers
                },
            });

            toast.success('Post deleted successfully!')
            // Update the local state with the updated post
            const updatedPosts = myPosts.map((post) =>
                post._id === editPost._id ? { ...post, ...updatedPost } : post
            );
            setMyPosts(updatedPosts);
            setEditPost(null); // Close the edit form
        } catch (err) {
            setError("Failed to update post");
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">
                My Posts
            </h1>

            {/* Edit Post Form */}
            {editPost && (
                <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                    <h2 className="text-2xl font-semibold mb-4">Edit Post</h2>
                    <form onSubmit={handleUpdate}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                value={editPost.title}
                                onChange={(e) => setEditPost({ ...editPost, title: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Content
                            </label>
                            <textarea
                                value={editPost.content}
                                onChange={(e) => setEditPost({ ...editPost, content: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-md"
                                rows="4"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 text-white rounded-md"
                            >
                                Update Post
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Display Posts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {myPosts.length === 0 ? (
                    <p className="text-center text-xl">No posts available.</p>
                ) : (
                    myPosts.map((post) => (
                        <div
                            key={post._id}
                            className="bg-white shadow-lg rounded-lg overflow-hidden transition-all hover:shadow-xl hover:-translate-y-2 border-2 relative"
                        >
                            <div className="flex gap-2 absolute top-2 text-xl text-red-700 z-50 right-2">
                                <FaTrash
                                    className="text-xl text-red-700 cursor-pointer"
                                    onClick={() => handleDelete(post._id)}
                                />
                                <FaEdit
                                    className="text-xl text-red-700 cursor-pointer"
                                    onClick={() => handleEdit(post._id)}
                                />
                            </div>
                            <div className="relative">
                                <img
                                    src={post.image || "https://via.placeholder.com/600x300"}
                                    alt={post.title}
                                    className="w-full h-56 object-cover"
                                />
                                <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-transparent to-black opacity-50 h-full"></div>
                            </div>
                            <div className="p-6">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                                    {post.title}
                                </h2>
                                <p className="text-sm text-gray-500 mb-4">
                                    {post.content}
                                </p>
                                <div className="author">
                                    author: <span className="font-bold">{post.author.name}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyPosts;

