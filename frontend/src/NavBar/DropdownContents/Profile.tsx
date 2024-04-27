import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  if (auth.isLoggedIn) {
    return (
      <div className="flex flex-col justify-between h-full">
        <div>
          <p className="text-2xl underline">Account</p>
          <div className="flex flex-col p-2 mt-5 max-h-60 overflow-scroll">
            <p className="text-xl">Welcome, {auth.username}</p>
            <div className="mt-3 flex flex-col p-1 justify-between">
              <button
                onClick={() => {
                  navigate("/create-listing");
                }}
                className=" w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              >
                Create a new Listing
              </button>
              <button
                onClick={() => {
                  navigate("/view-listings");
                }}
                className=" mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              >
                View your Listings
              </button>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            auth.logout();
            navigate("/");
          }}
          className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded mt-4"
        >
          Logout
        </button>
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-between h-screen">
      <div>
        <p className="text-2xl underline">Account</p>
        <p className="text-xl mt-4">Log in to see your account</p>
      </div>
      <div className="flex flex-col gap-3">
        <button
          onClick={() => {
            navigate("/login");
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Log in
        </button>
        <button
          onClick={() => {
            navigate("/signin");
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default Profile;
