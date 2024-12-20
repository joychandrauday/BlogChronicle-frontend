import { Link } from "react-router-dom";
import { useState } from "react";
import useUser from "../../../Hook/useUser";

const Navbar = () => {
  const { user, loading, error } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // Logout function
  const onLogout = () => {
    localStorage.removeItem("authToken");
    window.location.reload(); // Optional: Reload to clear the state
  };
  console.log(user);
  return (
    <div className="navbar bg-base-100 shadow-md px-4 lg:px-10">
      {/* Brand Logo */}
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Blog Chronicle
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-none hidden lg:flex space-x-4">
        <Link to="/all-posts" className="btn btn-ghost">
          All Posts
        </Link>
        <Link to="/my-posts" className="btn btn-ghost">
          My Posts
        </Link>
        {
          user?.role === 'admin' && <>
            <Link to="/user" className="btn btn-ghost relative">
              User Manage <div className="badge absolute badge-warning -top-2 -left-2 z-5 skew-x-12 -skew-y-12">admin</div>
            </Link>
            <Link to="/post" className="btn btn-ghost relative">
              Post Manage<div className="badge absolute badge-warning -top-2 -left-2 z-5 skew-x-12 -skew-y-12">admin</div>
            </Link>
          </>
        }
        <Link to="/learn-more" className="btn btn-ghost">
          Learn More
        </Link>
      </div>

      {/* Authentication and Profile */}
      <div className="flex-none">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : user ? (
          <div className="relative">
            {/* Profile Button */}
            <button
              className="btn btn-ghost btn-circle avatar"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="w-10 rounded-full">
                <img
                  src={user.profileImage || "/default-avatar.png"}
                  alt="Profile"
                />
              </div>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <ul className="absolute right-0 mt-2 bg-base-100 shadow-lg rounded-md p-2 w-48 z-50">
                <li>
                  <Link
                    to="/post-blog"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Post Blog
                  </Link>
                </li>
                <li>
                  <button
                    onClick={onLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <div className="flex space-x-4">
            <Link to="/login" className="btn btn-primary rounded-full">
              Login
            </Link>
            <Link to="/register" className="btn btn-secondary rounded-full">
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
