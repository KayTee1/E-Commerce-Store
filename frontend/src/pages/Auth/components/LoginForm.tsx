import { ChangeEvent, useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

import Message from "../../../shared/Message";
import FormItem from "../../../shared/FormItem";

type FormData = {
  email: string;
  password: string;
};
type MessageType = {
  message: string;
  color: string;
};

const LoginForm = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState<MessageType>({
    message: "",
    color: "",
  });
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setMessage({ message: "", color: "" });
  };

  const validateForm = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = formData;
    if (!email || !password) {
      setMessage({ message: "Missing details!", color: "red" });
      return;
    }

    handleSubmit();
  };

  const handleSubmit = useCallback(async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL;
      const apiUrl = "/api/users/login";
      const res = await fetch(baseUrl + apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.status === 401 || res.status === 404) {
        setMessage({ message: "Invalid credentials!", color: "red" });
        return;
      }
      setMessage({ message: "Login successful!", color: "green" });
      console.log(data);
      auth.login(
        data.userId,
        data.username,
        data.token,
        new Date(new Date().getTime() + 1000 * 60 * 60)
      );
      navigate("/");
    } catch (error) {
      setMessage({ message: "Something went wrong!", color: "red" });
    }
  }, [formData, auth, navigate]);

  return (
    <form onSubmit={validateForm} className="space-y-6">
      <div className="mb-4 w-full">
        <FormItem
          name="email"
          placeholder="Enter email"
          handleChange={handleChange}
        />
      </div>
      <div className="mb-4 w-full">
        <FormItem
          name="password"
          placeholder="Password"
          handleChange={handleChange}
        />
      </div>

      <Message message={message} />

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
