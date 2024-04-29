import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto mt-4 bg-white rounded-lg shadow-lg">
      <div className="bg-gray-100 p-5">
        <h1 className="text-center text-2xl font-bold">Login</h1>
      </div>
      <div className="p-6">
        <LoginForm />
        <button
          onClick={() => navigate("/signup")}
          className="w-full mt-2 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Sign up instead
        </button>
      </div>
    </div>
  );
};

export default Login;
