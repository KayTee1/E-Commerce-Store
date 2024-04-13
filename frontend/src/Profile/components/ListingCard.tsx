import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Modal from "../../shared/Modal";

type ListingType = {
  id: number;
  title: string;
  price: string;
  product_id: string;
  description: string;
  image: string;
};
type ListingCardProps = {
  listing: ListingType;
};
type ModalTypes = "Delete" | "Confirm" | "";

const ListingCard = ({ listing }: ListingCardProps) => {
  const auth = useContext(AuthContext);
  const [modal, setModal] = useState({
    show: false,
    modalType: "",
  });

  const { id, title, price, description, image } = listing;

  const showModal = (modalType: ModalTypes) => {
    setModal({
      show: true,
      modalType,
    });
  };

  return (
    <div key={id} className="border border-gray-300 rounded-lg p-4 mb-4 w-96">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-500">${price}</p>
      <p>{description}</p>
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover mt-2 rounded-md"
      />
      <div className="flex flex-row justify-around">
        <button className="w-40 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-2">
          Edit
        </button>
        <button
          onClick={() => {
            showModal("Confirm");
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
      />
    </div>
  );
};

export default ListingCard;
