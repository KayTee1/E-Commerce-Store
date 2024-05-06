import React, { ChangeEvent } from "react";
import FormItem from "../../../shared/FormItem";
type Category = {
  category_id: string;
  name: string;
};
type MessageType = {
  message: string;
  color: "red" | "green" | "";
};

type FormData = {
  product_id: string;
  title: string;
  price: string;
  description: string;
  image: string | ArrayBuffer;
  owner: string;
  categories: Category[];
};
type FormItemsProps = {
  previousData?: {
    title: string;
    price: string;
    description: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  setMessage: React.Dispatch<React.SetStateAction<MessageType>>;
};

const FormItems = ({
  setFormData,
  setMessage,
  previousData,
}: FormItemsProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
    setMessage({ message: "", color: "" });
  };

  return (
    <div>
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FormItem
            name="title"
            placeholder={previousData ? previousData.title : "Bike"}
            handleChange={handleChange}
          />
          <FormItem
            name="price"
            displayName="Price (€)"
            placeholder={previousData ? previousData.price : "100"}
            handleChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-1">
          <FormItem
            name="description"
            placeholder={
              previousData ? previousData.description : "A nice bike"
            }
            handleChange={handleChange}
          />
        </div>
      </form>
    </div>
  );
};

export default FormItems;

export const validateBasicForm = (formData: FormData) => {
  const { title, price, description } = formData;

  if (!title || !price || !description) {
    return { message: "All fields must be filled", color: "red" };
  }

  if (isNaN(Number(price))) {
    return { message: "Price must be a number", color: "red" };
  }
  if (parseFloat(price) <= 0.0) {
    return { message: "Price must be greater than 0", color: "red" };
  }

  if (description.length < 10) {
    return {
      message: "Description must be at least 10 characters",
      color: "red",
    };
  }
  if (description.length > 150) {
    return {
      message: "Description must be less than 150 characters",
      color: "red",
    };
  }
  if (title && title[0] !== title[0].toUpperCase()) {
    return { message: "Title must start with a capital letter", color: "red" };
  }

  if (title.length > 20) {
    return { message: "Title must be less than 20 characters", color: "red" };
  }
  return null;
};
