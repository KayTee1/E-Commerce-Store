import { ChangeEvent } from "react";
import FormItem from "../../../shared/FormItem";

type FormData = {
  name: string;
  email: string;
  address: string;
  postalCode: string;
};

type DetailsFormProps = {
  formData: FormData;
  setFormData: (formData: FormData) => void;
};

const DetailsForm = ({ formData, setFormData }: DetailsFormProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  return (
    <div>
      <FormItem
        name="name"
        placeholder="John Doe"
        handleChange={handleChange}
      />
      <FormItem
        name="email"
        placeholder="john.doe@gmail.com"
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
    </div>
  );
};

export default DetailsForm;
