import { useState } from "react";
import Modal from "../../shared/Modal";

type ListingType = {
  id: number;
  title: string;
  price: string;
  product_id: string;
  description: string;
  image: string;
  owner: string;
};
type ListingCardProps = {
  listing: ListingType;
};
type ModalTypes = "Delete" | "Edit" | "";

const ListingCard = ({ listing }: ListingCardProps) => {
  const [modal, setModal] = useState({
    show: false,
    modalType: "",
  });

  const [productData, setProductData] = useState({
    id: listing.id,
    title: listing.title,
    price: listing.price,
    product_id: listing.product_id,
    description: listing.description,
    image: listing.image,
    owner: listing.owner,
  });

  const showModal = (modalType: ModalTypes) => {
    setModal({
      show: true,
      modalType,
    });
  };

  return (
    <div key={productData.id} className="border border-gray-300 rounded-lg p-4 mb-4 w-96">
      <h3 className="text-xl font-bold">{productData.title}</h3>
      <p className="text-gray-500">${productData.price}</p>
      <p>{productData.description}</p>
      <img
        src={productData.image}
        alt={productData.title}
        className="w-full h-48 object-cover mt-2 rounded-md"
      />
      <div className="flex flex-row justify-around">
        <button
          onClick={() => {
            showModal("Edit");
          }}
          className="w-40 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-2"
        >
          Edit
        </button>
        <button
          onClick={() => {
            showModal("Delete");
          }}
          className="w-40 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mt-2 ml-2"
        >
          Delete
        </button>
      </div>
      <Modal
        onHide={() => setModal({ show: false, modalType: "" })}
        show={modal.show}
        modalType={modal.modalType as ModalTypes}
        item={listing}
        setProductData={setProductData}
      />
    </div>
  );
};

export default ListingCard;
