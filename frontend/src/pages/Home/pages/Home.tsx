import { Link } from "react-router-dom";

const Home = () => {
  
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <h2 className="text-3xl font-bold mb-4">Welcome to React Store</h2>
      <p className="text-lg text-gray-600 mb-8">
        Your one-stop shop for all your needs.
      </p>
      
      <Link
        to="/collections"
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      >
        Browse Products
      </Link>
    </div>
  );
};

export default Home;
