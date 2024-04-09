import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
    const auth = useContext(AuthContext);
    if (auth.isLoggedIn) {
      return (
        <div className="flex flex-col justify-between h-full">
          <div>
            <p className="text-2xl underline">Account</p>
            <div className="flex flex-col p-2 mt-5 max-h-60 overflow-scroll">
              <p className="text-xl">Welcome, {auth.username}</p>
            </div>
          </div>
          <button
            onClick={() => auth.logout()}
            className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded mt-4"
          >
            Logout
          </button>
        </div>
      );
    }
    return (
      <div className="flex flex-col">
        <p className="text-2xl underline">Account</p>
        <p className="text-xl">Log in to see your account</p>
        <a className="text-blue-500 hover:underline" href="/login">
          Log in
        </a>
      </div>
    );
  };

export default Profile;