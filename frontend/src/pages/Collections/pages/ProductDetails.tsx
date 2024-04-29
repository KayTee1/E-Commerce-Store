import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../../shared/Loader";
import ProductIcons from "../../../shared/ProductIcons";
import { useCart } from "../../../context/CartContext";
import { AuthContext } from "../../../context/AuthContext";

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
  const { addToCart } = useCart();
  const auth = useContext(AuthContext);

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

  const handleAddCart = () => {
    addToCart(product);
  };

  const handleAddFavorite = async () => {
    if (!auth.isLoggedIn)
      return console.log("Please log in to add to favorites");
    try {
      const baseApiUrl = import.meta.env.VITE_API_URL;
      const res = await fetch(baseApiUrl + `/api/favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({
          product_id: product.product_id,
          user_id: auth.userId,
        }),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

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
            <h2 className="text-2xl font-bold mb-4 underline">
              {product.title}
            </h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-gray-800 text-xl mb-4">{product.price}€</p>
            <ProductIcons
              handleCart={handleAddCart}
              handleFavorite={handleAddFavorite}
              type="addCart"
            />
            <p className="text-gray-600">Owner: {product.owner}</p>
            <p className="text-gray-600">Categories:</p>
            {product.categories.length > 0 && (
              <div className="flex flex-wrap gap-y-2 mt-2 max-w-64">
                {product.categories.map((category) => (
                  <span
                    key={category.id}
                    className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm mr-2"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
