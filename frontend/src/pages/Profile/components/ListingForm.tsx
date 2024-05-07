import { useContext, useState } from "react";

import { AuthContext } from "../../../context/AuthContext";

import { CategoriesSelector } from "./CategoriesSelector";
import FormItems, { validateBasicForm } from "./FormItems";
import ImageSelector from "./ImageSelector";

import Modal from "../../../shared/Modal";
import Message from "../../../shared/Message";

type Category = {
  category_id: string;
  name: string;
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
type MessageType = {
  message: string;
  color: "red" | "green" | "";
};

type ListingFormProps = {
  method: string;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  postListing?: () => Promise<{ message: string; success: boolean }>;
  editListing?: () => Promise<{ message: string; success: boolean }>;
  placeholders?: {
    title: string;
    price: string;
    description: string;
    image: string;
  };
};
type ModalTypes = "Delete" | "Edit" | "Info";

const ListingForm = ({
  method,
  formData,
  setFormData,
  ...props
}: ListingFormProps) => {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [message, setMessage] = useState<MessageType>({
    message: "",
    color: "",
  });
  const [modal, setModal] = useState({
    show: false,
    modalType: "",
    info: "",
  });
  const [preview, setPreview] = useState<null | ArrayBuffer>(null);

  const auth = useContext(AuthContext);

  const showModal = (modalType: ModalTypes, info: string) => {
    setModal({
      show: true,
      modalType,
      info,
    });
  };

  const postCategory = async (category: Category) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(apiUrl + "/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(category),
      });
      if (!response.ok) {
        throw new Error("Failed to create category");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitNewCategory = async () => {
    let newCategories = selectedCategories.filter((category) => {
      const capitalizedCategoryName =
        category.name.charAt(0).toUpperCase() + category.name.slice(1);

      return !categories.some((c) => c.name === capitalizedCategoryName);
    });

    if (newCategories.length === 0) {
      return;
    }
    try {
      await Promise.all(
        newCategories.map((category) => postCategory(category))
      );
    } catch (error) {
      showModal("Info", "Failed to create one or more categories");
      console.log("Failed to create one or more categories:", error);
    }
  };

  const validateForm = async () => {
    const result = validateBasicForm(formData);
    if (result) {
      setMessage({ message: result.message, color: "red" });
      return;
    }

    if (selectedCategories.length === 0) {
      setMessage({
        message: "Please select at least one category",
        color: "red",
      });
      return;
    }
    await handleSubmitNewCategory();
    formData.categories = selectedCategories;

    if (!props.placeholders?.image && !preview) {
      setMessage({ message: "Please upload an image", color: "red" });
      return;
    }

    formData.image = preview! ?? props.placeholders?.image;

    try {
      if (method === "POST" && props.postListing) {
        const response = await props.postListing();
        handleResponse(response);
      } else if (method === "PUT" && props.editListing) {
        const response = await props.editListing();
        handleResponse(response);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setMessage({
        message: "An unexpected error has occurred",
        color: "red",
      });
    }
  };
  const handleResponse = ({
    success,
    message,
  }: {
    success: boolean;
    message: string;
  }) => {
    if (success) {
      setMessage({ message: message, color: "green" });
    } else {
      setMessage({
        message: message,
        color: "red",
      });
    }
  };
  return (
    <div className="grid bg-slate-100 p-9 rounded-lg border-solid border-4">
      <FormItems
        previousData={props.placeholders}
        setFormData={setFormData}
        setMessage={setMessage}
      />
      <ImageSelector
        previousData={props.placeholders}
        preview={preview}
        setPreview={setPreview}
      />

      <div className="mx-2 my-2">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Categories
        </label>
        <CategoriesSelector
          categories={categories}
          setCategories={setCategories}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          showModal={showModal}
        />
      </div>

      <button
        onClick={validateForm}
        className="mt-4 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Submit
      </button>
      <Message message={message} className="mt-2" />
      <Modal
        onHide={() => setModal({ show: false, modalType: "", info: "" })}
        show={modal.show}
        modalType={modal.modalType as ModalTypes}
        info={modal.info}
      />
    </div>
  );
};

export default ListingForm;
