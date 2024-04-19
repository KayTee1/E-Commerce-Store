import { useContext } from "react";
import { CgHeart } from "react-icons/cg";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { AuthContext } from "../../context/AuthContext";
import { BsHeartbreak } from "react-icons/bs";

type DropdownItemProps = {
  item: {
    id: number;
    product_id: string;
    title: string;
    quantity?: number;
  };
  type: "cart" | "favorites";
};

const DropdownItem = ({ item, type }: DropdownItemProps) => {
  const auth = useContext(AuthContext);

  const handleAddFavorite = async () => {
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

      if (!response.ok) {
        throw new Error("Failed to remove from favorites");
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="flex items-center justify-between p-4 my-2 bg-gray-100 rounded-lg shadow-md">
      <div className="flex items-center">
        <p className="font-semibold">{item.title}</p>
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
        <div className="flex items-center space-x-4">
          <button
            onClick={handleAddFavorite}
            className="text-red-500 hover:text-red-700"
          >
            <CgHeart />
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <MdOutlineRemoveShoppingCart />
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownItem;
