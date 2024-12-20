import React from "react";
import { Link } from "react-router-dom";
import useUser from "../../Hook/useUser";

const Home = () => {
  const { user } = useUser()
  console.log(user);
  return (
    <div className="container min-h-screen flex flex-col items-center justify-center mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Welcome to Blog Chronicle</h1>
      <p className="text-center text-gray-600 mb-8">
        Discover insightful blogs and share your own stories with the world!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-4">
          <Link to={'/'}></Link>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">

        </div>
        <div className="bg-white shadow-md rounded-lg p-4">

        </div>
      </div>
    </div>
  );
};

export default Home;
