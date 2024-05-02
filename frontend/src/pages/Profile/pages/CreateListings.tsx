import { useContext, useState } from "react";

import { AuthContext } from "../../../context/AuthContext";
import ListingForm from "../components/ListingForm";
import { generateID } from "../../../utils/IDs";

type Category = {
  category_id: string;
  name: string;
};
type FormData = {
  title: string;
  price: string;
  description: string;
  image: string;
  owner: string;
  categories: Category[];
};
const CreateListings = () => {
  const auth = useContext(AuthContext);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    price: "",
    description: "",
    image: "",
    owner: "",
    categories: [],
  });

  const postListing = async () => {
    try {
      const baseApiUrl = import.meta.env.VITE_API_URL;
      // Add owner and product_id to formData
      const completedFormData = {
        ...formData,
        owner: auth.username ?? "",
        product_id: await generateID("products"),
      };
      const response = await fetch(`${baseApiUrl}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(completedFormData),
      });

      if (!response.ok) {
        throw new Error("Failed to create listing");
      }

      return { success: true, message: "Listing created" };
    } catch (error) {
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
