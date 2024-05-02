import { useCart } from "../context/CartContext";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ProductIcons from "./ProductIcons";
import Modal from "./Modal";

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

type ModalTypes = "Delete" | "Edit" | "Info";

const ProductListingCard = ({ product }: ProductListingProps) => {
  const auth = useContext(AuthContext);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [modal, setModal] = useState({
    show: false,
    modalType: "",
    info: "",
  });

  const { title, description, price, image } = product;

  const handleAddCart = () => {
    product.quantity = 1;
    addToCart(product);
  };

  const showModal = (modalType: ModalTypes, info: string) => {
    setModal({
      show: true,
      modalType,
      info,
    });
  };

  const handleFavorite = async () => {
    if (!auth.isLoggedIn) {
      showModal("Info", "Please log in to add to favorites");
      return;
    }
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
      if (!res.ok) {
        throw new Error("Failed to add to favorites");
      }
    } catch (error) {
      showModal("Info", "Failed to add to favorites");
      console.log(error);
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
      <Modal
        onHide={() => setModal({ show: false, modalType: "", info: "" })}
        show={modal.show}
        modalType={modal.modalType as ModalTypes}
        info={modal.info}
      />
    </div>
  );
};

export default ProductListingCard;
