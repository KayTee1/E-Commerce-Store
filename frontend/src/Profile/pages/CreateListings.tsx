import { useContext, useState } from "react";

import { AuthContext } from "../../context/AuthContext";
import ListingForm from "../components/ListingForm";

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

  const postListing = async () => {
    try {
      const baseApiUrl = import.meta.env.VITE_API_URL;
      const formDataWithOwner = {
        ...formData,
        owner: auth.username ?? "",
        product_id: generateID(),
      };
      const response = await fetch(`${baseApiUrl}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(formDataWithOwner),
      });

      if (!response.ok) {
        throw new Error("Failed to create listing");
      }

      return { success: true, message: "Listing created" };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Failed to create listing" };
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <h2 className="text-3xl font-bold mb-4">Create a Listing</h2>

      <ListingForm
        method="POST"
        formData={formData}
        setFormData={setFormData}
        postListing={postListing}
      />
    </div>
  );
};

export default CreateListings;

const generateID = (): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters[randomIndex];
  }
  return id;
};
