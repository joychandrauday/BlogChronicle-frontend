import React, { useState, useEffect } from "react";
import useAxiosPublic from "../../Hook/useAxiosPublic";

const AllPosts = () => {
    const axiosPublic = useAxiosPublic();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState(""); // State for the search query
    const [sortBy, setSortBy] = useState("createdAt"); // Default sort by date
    const [sortOrder, setSortOrder] = useState("desc"); // Default sort order is descending

    // Function to fetch posts with search query and sorting
    const fetchPosts = async () => {
        setLoading(true);
        try {
            const response = await axiosPublic.get(
                `/api/blogs?search=${searchQuery}&sortBy=${sortBy}&sortOrder=${sortOrder}&filter=`
            );
            setPosts(response.data.data); // Assuming the response contains an array of posts
        } catch (err) {
            setError("Failed to fetch posts");
        } finally {
            setLoading(false);
        }
    };

    // Trigger fetch when search query or sort options change
    const handleSearch = () => {
        fetchPosts(); // Trigger the API call with the current search query and sort options
    };

    const handleSortChange = (e) => {
        const { name, value } = e.target;
        if (name === "sortBy") {
            setSortBy(value);
        } else if (name === "sortOrder") {
            setSortOrder(value);
        }
    };

    useEffect(() => {
        fetchPosts(); // Fetch posts on component mount or when search or sort options change
    }, [searchQuery, sortBy, sortOrder]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">All Posts</h1>

            {/* Search Bar */}
            <div className="mb-4 flex space-x-2">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
                    placeholder="Search posts"
                    className="input input-bordered w-full max-w-xs"
                />
                <button
                    onClick={handleSearch}
                    className="btn btn-primary"
                >
                    Search
                </button>
            </div>

            {/* Sort Options */}
            <div className="mb-4 flex space-x-4">
                <select
                    name="sortBy"
                    value={sortBy}
                    onChange={handleSortChange}
                    className="select select-bordered"
                >
                    <option value="createdAt">Sort by Date</option>
                    <option value="title">Sort by Title</option>
                    {/* Add more options as needed */}
                </select>

                <select
                    name="sortOrder"
                    value={sortOrder}
                    onChange={handleSortChange}
                    className="select select-bordered"
                >
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                </select>
            </div>

            {/* Posts Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.length === 0 ? (
                    <p>No posts found.</p>
                ) : (
                    posts.map((post) => (
                        <div key={post.id} className="bg-white shadow-md rounded-lg p-4 border">
                            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                            <p className="text-sm text-gray-500 mb-4">{post.summary}</p>
                            <button className="btn btn-primary rounded-full">Read More</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AllPosts;
