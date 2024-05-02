import { useCart } from "../context/CartContext";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ProductIcons from "./ProductIcons";

type ProductListingProps = {
  product: {
    id: number;
    product_id: string;
    title: string;
    description: string;
    price: string;
    owner: string;
    image: string;
    quantity?: number;
  };
};

const ProductListingCard = ({ product }: ProductListingProps) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { title, description, price, image } = product;

  const handleAddCart = () => {
    product.quantity = 1;
    addToCart(product);
  };

  const handleFavorite = async () => {
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
      await res.json();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg max-w-60">
      <img
        onClick={() => {
          navigate(`/products/${product.product_id}`);
        }}
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col w-64">
        <div className="flex flex-row items-baseline justify-between">
          <h3 className="text-lg font-semibold mb-2 ">{title}</h3>
          <p className="text-gray-600 mr-3">{price} €</p>
        </div>
        <ProductIcons
          handleFavorite={handleFavorite}
          handleCart={handleAddCart}
          type="addCart"
        />
        <p className="w-48">{description}</p>
      </div>
    </div>
  );
};

export default ProductListingCard;
