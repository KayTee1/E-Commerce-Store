import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../../shared/Loader";

import ProductDetailsCard from "../components/ProductDetailsCard";

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
const ProductDetails = () => {
  const { product_id } = useParams();

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
  const [isLoading, setIsLoading] = useState(false);

  const fetchProductData = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      setIsLoading(true);
      const response = await fetch(
        apiUrl + `/api/products/product/${product_id}`
      );
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProductData();
  }, [product_id]);

  return (
    <div className="flex flex-col justify-center mx-10 mt-8">
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <ProductDetailsCard product={product} />
      )}
    </div>
  );
};

export default ProductDetails;
