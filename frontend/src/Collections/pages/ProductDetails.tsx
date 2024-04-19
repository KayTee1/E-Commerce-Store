import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../shared/Loader";
type Product = {
  id: number;
  productId: string;
  title: string;
  description: string;
  price: string;
  owner: string;
  image: string;
  quantity?: number;
};
const ProductDetails = () => {
  const { product_id } = useParams();
  const [product, setProduct] = useState<Product>({
    id: 0,
    productId: "",
    title: "",
    description: "",
    price: "",
    owner: "",
    image: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchProductData = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      setIsLoading(true);
      const response = await fetch(apiUrl + `/api/products/${product_id}`);
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={product.image}
              alt={product.title}
              className="w-full rounded-lg"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-gray-800 font-bold text-xl mb-4">
              {product.price}€
            </p>
            <p className="text-gray-600">Owner: {product.owner}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
