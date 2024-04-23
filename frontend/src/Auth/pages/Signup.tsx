import SignupForm from "../components/SignupForm";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto mt-5 bg-white rounded-lg overflow-hidden shadow-lg">
      <div className="bg-gray-100 p-2">
        <h1 className="text-center text-2xl font-bold">Sign Up</h1>
      </div>
      <div className="p-5">
        <SignupForm />

        <button
          onClick={() => {
            navigate("/login");
          }}
          className="w-full mt-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Login instead
        </button>
      </div>
    </div>
  );
};

export default Signup;
