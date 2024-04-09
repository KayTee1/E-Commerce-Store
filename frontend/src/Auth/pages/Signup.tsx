import SignupForm from "../components/SignupForm";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-lg overflow-hidden shadow-lg">
      <div className="bg-gray-100 p-5">
        <h1 className="text-center text-2xl font-bold">Sign Up</h1>
      </div>
      <div className="p-5">
        <SignupForm />
        <button
          onClick={() => {
            navigate("/login");
          }}
          className="w-full mt-2 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login instead
        </button>
      </div>
    </div>
  );
};

export default Signup;