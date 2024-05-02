import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsHeartbreak } from "react-icons/bs";

import { AuthContext } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

import ProductIcons from "../../shared/ProductIcons";
import Modal from "../../shared/Modal";

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
type ModalTypes = "Delete" | "Edit" | "Info";

const DropdownItem = ({ item, type, ...props }: DropdownItemProps) => {
  const [modal, setModal] = useState({
    show: false,
    modalType: "",
    info: "",
  });
  const auth = useContext(AuthContext);
  const { removeFromCart } = useCart();
  const navigate = useNavigate();

  const showModal = (modalType: ModalTypes, info: string) => {
    setModal({
      show: true,
      modalType,
      info,
    });
  };

  const handleFavorite = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(`${apiUrl}/api/favoritses`, {
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
        showModal("Info", "Failed to add to favorites");
        throw new Error("Failed to add to favorites");
      }
    } catch (e) {
      console.log(e);
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
        showModal("Info", "Failed to remove from favorites");
        throw new Error("Failed to remove from favorites");
      }
    } catch (e) {
      console.log(e);
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
      <Modal
        onHide={() => setModal({ show: false, modalType: "", info: "" })}
        show={modal.show}
        modalType="Info"
        info={modal.info}
      />
    </div>
  );
};

export default DropdownItem;
