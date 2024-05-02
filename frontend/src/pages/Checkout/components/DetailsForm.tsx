import { ChangeEvent, useState } from "react";
import FormItem from "../../../shared/FormItem";
import Button from "../../../shared/Button";
import Message from "../../../shared/Message";

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

type MessageType = {
  message: string;
  color: "red" | "green" | "";
};
type FormData = {
  name: string;
  email: string;
  address: string;
  postalCode: string;
};

type DetailsFormProps = {
  formData: FormData;
  setFormData: (formData: FormData) => void;
  products: Product[];
};

const DetailsForm = ({ formData, setFormData, products }: DetailsFormProps) => {
  const [message, setMessage] = useState<MessageType>({
    message: "",
    color: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setMessage({ message: "", color: "" });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, address, postalCode } = formData;
    if (!name || !email || !address || !postalCode) {
      setMessage({ message: "Please fill in all fields", color: "red" });
      return;
    }
    if (products.length === 0) {
      setMessage({ message: "Please add items to cart", color: "red" });
      return;
    }

    setMessage({ message: "Order placed successfully", color: "green" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormItem
        name="name"
        placeholder="John Doe"
        handleChange={handleChange}
      />
      <FormItem
        name="email"
        placeholder="John.doe@gmail.com"
        handleChange={handleChange}
      />
      <FormItem
        name="address"
        placeholder="Tampere"
        handleChange={handleChange}
      />
      <FormItem
        name="postalCode"
        displayName="Postal Code"
        placeholder="33100"
        handleChange={handleChange}
      />
      <Message message={message} />
      <Button
        className="self-center mt-4 w-full max-w-sm"
        content="Place Order"
        variant="primary"
        type="submit"
      />
    </form>
  );
};

export default DetailsForm;
