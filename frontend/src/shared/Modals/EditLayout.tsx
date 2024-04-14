import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../Loader";
import ListingForm from "../../Profile/components/ListingForm";

type Listing = {
  id: number;
  product_id: string;
  title: string;
  price: string;
  description: string;
  image: string;
  owner: string;
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
};

export const EditLayout = ({ item, show, setProductData }: EditLayoutProps) => {
  if (!show) {
    return null;
  }
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const { title, product_id } = item;

  const [formData, setFormData] = useState<FormData>({
    title: "",
    price: "",
    description: "",
    image: "",
    owner: "",
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
      console.log(response);
      setProductData({
        id: item.id,
        product_id: item.product_id,
        title: formData.title,
        price: formData.price,
        description: formData.description,
        image: formData.image,
        owner: formData.owner,
      });
      return { message: "Listing Updated Successfully", success: true };
    } catch (e) {
      setIsLoading(false);
      console.error(e);
      return { message: "Failed to delete listing", success: false };
    }
  };
  const header = (
    <div>
      <h2>Edit {title}</h2>
    </div>
  );

  const body = (
    <div>
      <div className="flex flex-col justify-center items-center">
        <Loader isLoading={isLoading} />
        <ListingForm
          method="PUT"
          formData={formData}
          setFormData={setFormData}
          editListing={editListing}
        />
      </div>
    </div>
  );

  const footer = <div></div>;
  return { header, body, footer };
};
