import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { BsHeartbreak } from "react-icons/bs";
import ProductIcons from "../../shared/ProductIcons";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

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

type Item = Product & {
  id: number;
  product_id: string;
  title: string;
  owner: string;
  quantity?: number;
};

type DropdownItemProps = {
  item: Item;
  type: "cart" | "favorites";
  setFavoriteProducts?: React.Dispatch<React.SetStateAction<Product[]>>;
};

const DropdownItem = ({ item, type, ...props }: DropdownItemProps) => {
  const auth = useContext(AuthContext);
  const { removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleFavorite = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(`${apiUrl}/api/favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({
          user_id: auth.userId,
          product_id: item.product_id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add to favorites");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleRemoveFavorite = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(`${apiUrl}/api/favorites`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({
          user_id: auth.userId,
          product_id: item.product_id,
        }),
      });
      if (props.setFavoriteProducts) {
        props.setFavoriteProducts((prev) =>
          prev.filter((product) => product.id !== item.id)
        );
      }
      if (!response.ok) {
        throw new Error("Failed to remove from favorites");
      }
    } catch (e) {
      console.error(e);
    }
  };
  const handleRemoveCart = () => {
    removeFromCart(item);
  };
  return (
    <div className="flex items-center justify-between p-4 my-2 bg-gray-100 rounded-lg shadow-md">
      <div className="flex items-center">
        <p
          onClick={() => {
            navigate(`/products/${item.product_id}`);
          }}
          className="font-semibold underline cursor-pointer"
        >
          {item.title}
        </p>
        {item.quantity && item.quantity > 1 && (
          <p className="ml-2 text-xs text-gray-500">{`Qty: ${item.quantity}`}</p>
        )}
      </div>
      {type === "favorites" ? (
        <button
          onClick={handleRemoveFavorite}
          className="text-red-500 hover:text-red-700"
        >
          <BsHeartbreak />
        </button>
      ) : (
        <ProductIcons
          handleFavorite={handleFavorite}
          handleCart={handleRemoveCart}
          type="removeCart"
        />
      )}
    </div>
  );
};

export default DropdownItem;
