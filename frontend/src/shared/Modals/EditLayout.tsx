import { useContext, useState } from "react";

import ListingForm from "../../pages/Profile/components/ListingForm";

import { AuthContext } from "../../context/AuthContext";
import Loader from "../Loader";

type Category = {
  category_id: string;
  name: string;
};

type Listing = {
  id: number;
  product_id: string;
  title: string;
  price: string;
  description: string;
  image: string;
  owner: string;
  categories: Category[];
};

type EditLayoutProps = {
  item: Listing;
  show: boolean;
  setProductData: React.Dispatch<React.SetStateAction<Listing>>;
};

type FormData = {
  title: string;
  price: string;
  description: string;
  image: string;
  owner: string;
  categories: Category[];
};

export const EditLayout = ({ item, show, setProductData }: EditLayoutProps) => {
  if (!show) {
    return null;
  }
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const { title, product_id, price, description, image } = item;

  const [formData, setFormData] = useState<FormData>({
    title: "",
    price: "",
    description: "",
    image: "",
    owner: "",
    categories: [],
  });

  const editListing = async () => {
    const baseApiUrl = import.meta.env.VITE_API_URL;
    try {
      setIsLoading(true);
      const response = await fetch(`${baseApiUrl}/api/products/${product_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(formData),
      });
      setIsLoading(false);
      setProductData({
        id: item.id,
        product_id: item.product_id,
        title: formData.title,
        price: formData.price,
        description: formData.description,
        image: formData.image,
        owner: formData.owner,
        categories: formData.categories,
      });

      if (!response.ok) {
        throw new Error("Failed to update listing");
      }
      return { message: "Listing Updated Successfully", success: true };
    } catch (e) {
      console.log(e);
      return { message: "Failed to delete listing", success: false };
    } finally {
      setIsLoading(false);
    }
  };
  const header = (
    <div>
      <h2>Edit {title}</h2>
    </div>
  );

  const body = (
    <div>
      <div className="flex flex-col justify-center items-center max-h-full">
        <Loader isLoading={isLoading} />
        <ListingForm
          method="PUT"
          formData={formData}
          setFormData={setFormData}
          editListing={editListing}
          placeholders={{
            title,
            price,
            description,
            image,
          }}
        />
      </div>
    </div>
  );

  const footer = <div></div>;
  return { header, body, footer };
};
