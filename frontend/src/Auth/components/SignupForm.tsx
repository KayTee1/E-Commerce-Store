import { useNavigate } from "react-router-dom";
import { ChangeEvent, useCallback, useContext, useState } from "react";
import Message from "../../shared/Message";
import { AuthContext } from "../../context/AuthContext";
import FormItem from "../../shared/FormItem";

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};
type MessageType = {
  message: string;
  color: string;
};

const SignupForm = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState<MessageType>({
    message: "",
    color: "",
  });
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setMessage({ message: "", color: "" });
  };
  const validateForm = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;
    if (!username || !email || !password || !confirmPassword) {
      setMessage({ message: "Missing details!", color: "red" });
      return;
    }
    if (password !== confirmPassword) {
      setMessage({ message: "Passwords do not match!", color: "red" });
      return;
    }
    handleSubmit(formData);
  };
  const handleSubmit = useCallback(async (formData: FormData) => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL;
      const apiUrl = "/api/users/signup";
      const res = await fetch(baseUrl + apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.status === 422) {
        setMessage({ message: "User already exists!", color: "red" });
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        return;
      }
      setMessage({ message: "Sign up successful!", color: "green" });
      const data = await res.json();
      auth.login(
        data.id,
        data.token,
        new Date(new Date().getTime() + 1000 * 60 * 60)
      );

      navigate("/");
    } catch (error) {
      setMessage({ message: "Something went wrong!", color: "red" });
    }
  }, []);
  return (
    <form onSubmit={validateForm} className="space-y-6">
      <div className="mb-3">
        <FormItem
          name="username"
          placeholder="Enter username"
          handleChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <FormItem
          name="email"
          placeholder="Enter email"
          handleChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <FormItem
          name="password"
          placeholder="Enter password"
          handleChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <FormItem
          name="confirmPassword"
          displayName="Confirm Password"
          placeholder="Re-enter password"
          handleChange={handleChange}
        />
      </div>

      <Message message={message} />

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Sign up
      </button>
    </form>
  );
};

export default SignupForm;
