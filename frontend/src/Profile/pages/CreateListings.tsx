import { ChangeEvent, useContext, useState } from "react";
import FormItem from "../../shared/FormItem";
import Message from "../../shared/Message";
import { AuthContext } from "../../context/AuthContext";

type MessageType = {
  message: string;
  color: string;
};
type FormData = {
  title: string;
  price: string;
  description: string;
  image: string;
  owner: string;
};
const CreateListings = () => {
  const auth = useContext(AuthContext);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    price: "",
    description: "",
    image: "",
    owner: "",
  });

  const [message, setMessage] = useState<MessageType>({
    message: "",
    color: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage({ message: "", color: "" });
  };
  const validateForm = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { title, price, description, image } = formData;

    if (!title || !price || !description || !image) {
      setMessage({ message: "Please fill in all fields", color: "red" });
      return;
    }

    if (isNaN(Number(price))) {
      setMessage({ message: "Price must be a number", color: "red" });
      return;
    }
    const isValidImg = isValidImageUrl(image);
    if (!isValidImg) {
      setMessage({ message: "Image URL is invalid", color: "red" });
      return;
    }
    if (description.length < 10) {
      setMessage({
        message: "Description must be at least 10 characters",
        color: "red",
      });
      return;
    }
    if (title && title[0] !== title[0].toUpperCase()) {
      setMessage({
        message: "Title must start with a capital letter",
        color: "red",
      });
      return;
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      Owner: auth.username || "",
    }));

    postListing();
  };
  const postListing = async () => {
    formData.owner = auth.username ?? "";
    try {
      const baseApiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${baseApiUrl}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(formData),
      });
      console.log(response);
      setMessage({ message: "Listing created", color: "green" });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <h2 className="text-3xl font-bold mb-4">Create a Listing</h2>

      <form onSubmit={validateForm} className="grid">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FormItem
            name="title"
            placeholder="Bike"
            handleChange={handleChange}
          />
          <FormItem
            name="price"
            displayName="Price (€)"
            placeholder="80"
            handleChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-1">
          <FormItem
            name="description"
            placeholder="A nice bike"
            handleChange={handleChange}
          />
          <FormItem
            name="image"
            placeholder="https://www.example.com/image.jpg"
            handleChange={handleChange}
          />
        </div>

        <Message message={message} />
        <button
          type="submit"
          className="mt-3 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateListings;

const isValidImageUrl = async (url: string): Promise<boolean> => {
  const img = new Image();
  img.src = url;
  return img.complete;
};
