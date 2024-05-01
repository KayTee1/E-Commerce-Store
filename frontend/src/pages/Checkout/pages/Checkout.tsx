import { useState } from "react";
import { useCart } from "../../../context/CartContext";
import DetailsForm from "../components/DetailsForm";
import OrderSummary from "../components/OrderSummary";
import Button from "../../../shared/Button";

type Product = {
  id: number;
  product_id: string;
  title: string;
  description: string;
  price: string;
  owner: string;
  image: string;
  quantity?: number;
};

type FormData = {
  name: string;
  email: string;
  address: string;
  postalCode: string;
};

const Checkout = () => {
  const { cartState } = useCart();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    address: "",
    postalCode: "",
  });

  const handleSubmit = async () => {
    console.log(formData)
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold my-4">Checkout</h2>

      <div className="flex flex-row gap-56">
        <div>
          <h3 className="text-xl font-semibold">Personal Details</h3>
          <DetailsForm formData={formData} setFormData={setFormData} />
          <Button
            content="Place Order"
            variant="primary"
            onClick={() => handleSubmit()}
          />
        </div>
        <div className="">
          <h3 className="text-xl font-semibold">Order Summary</h3>
          <OrderSummary products={cartState.items as Product[]}/>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
