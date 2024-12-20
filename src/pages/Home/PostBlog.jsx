import React, { useState } from "react";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import toast from "react-hot-toast";

const PostBlog = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const authToken = localStorage.getItem("authToken"); // Retrieve the token from localStorage
    const axiosPublic = useAxiosPublic()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const blogData = {
                title,
                content,
            };

            // Post blog with Bearer token authorization
            const response = await axiosPublic.post("/api/blogs", blogData, {
                headers: {
                    Authorization: `Bearer ${authToken}`, // Include Bearer token
                },
            });

            toast.success("Blog posted successfully");
            // Optionally, you can reset the form or provide feedback to the user
            setTitle("");
            setContent("");

        } catch (error) {
            console.error("Error posting blog:", error);
            // Handle error (e.g., display error message)
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-md ">
            <h1 className="text-3xl font-bold mb-6">Post a New Blog</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold">Title</label>
                    <input
                        type="text"
                        className="input input-bordered w-full rounded-full"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold">Content</label>
                    <textarea
                        className="textarea textarea-bordered w-full rounded-lg"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary rounded-full">
                    Post Blog
                </button>
            </form>
        </div>
    );
};

export default PostBlog;
