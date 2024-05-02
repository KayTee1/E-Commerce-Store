import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProductDetailsCard from "../components/ProductDetailsCard";
import Loader from "../../../shared/Loader";
import Modal from "../../../shared/Modal";

type Category = {
  id: number;
  category_id: string;
  name: string;
};

type Product = {
  id: number;
  product_id: string;
  title: string;
  description: string;
  price: string;
  owner: string;
  image: string;
  quantity?: number;
  categories: Category[];
};
type ModalTypes = "Delete" | "Edit" | "Info";

const ProductDetails = () => {
  const { product_id } = useParams();

  const [modal, setModal] = useState({
    show: false,
    modalType: "",
    info: "",
  });
  const [product, setProduct] = useState<Product>({
    id: 0,
    product_id: "",
    title: "",
    description: "",
    price: "",
    owner: "",
    image: "",
    categories: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const showModal = (modalType: ModalTypes, info: string) => {
    setModal({
      show: true,
      modalType,
      info,
    });
  };

  const fetchProductData = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      setIsLoading(true);
      const response = await fetch(
        apiUrl + `/api/products/product/${product_id}`
      );

      if (!response.ok) {
        setIsError(true);
        throw new Error("Failed to fetch product data");
      }

      const data = await response.json();
      setProduct(data);
    } catch (error) {
      showModal("Info", "Failed to fetch product data");
      console.log("Error fetching data: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [product_id]);

  let content = <ProductDetailsCard product={product} />;

  if (isError) {
    content = (
      <h1 className="text-xl">Error fetching data for Product {product_id}</h1>
    );
  }

  return (
    <div className="flex flex-col justify-center mx-10 mt-8">
      {isLoading ? <Loader isLoading={isLoading} /> : content}
      <Modal
        onHide={() => setModal({ show: false, modalType: "", info: "" })}
        show={modal.show}
        modalType={modal.modalType as ModalTypes}
        info={modal.info}
      />
    </div>
  );
};

export default ProductDetails;
