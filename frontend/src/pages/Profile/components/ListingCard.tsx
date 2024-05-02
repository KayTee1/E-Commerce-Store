import { useState } from "react";
import Modal from "../../../shared/Modal";
import Button from "../../../shared/Button";

type Category = {
  category_id: string;
  name: string;
};

type ListingType = {
  id: number;
  title: string;
  price: string;
  product_id: string;
  description: string;
  image: string;
  owner: string;
  categories: Category[];
};
type ListingCardProps = {
  listing: ListingType;
};
type ModalTypes = "Delete" | "Edit" | "Info";

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
    categories: listing.categories,
  });

  const showModal = (modalType: ModalTypes) => {
    setModal({
      show: true,
      modalType,
    });
  };

  return (
    <div
      key={productData.id}
      className="border border-gray-300 rounded-lg p-4 mb-4 w-96"
    >
      <h3 className="text-xl font-bold">{productData.title}</h3>
      <p className="text-gray-500">${productData.price}</p>
      <p>{productData.description}</p>
      <img
        src={productData.image}
        alt={productData.title}
        className="w-full h-48 object-cover mt-2 rounded-md"
      />
      <div className="flex flex-row justify-around mt-3 gap-2">
        <Button
          content="Edit"
          variant="primary"
          onClick={() => {
            showModal("Edit");
          }}
          className="w-1/2"
        />

        <Button
          content="Delete"
          variant="dangerous"
          onClick={() => {
            showModal("Delete");
          }}
          className="w-1/2"
        />
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
