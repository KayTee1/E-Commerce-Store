import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../Loader";
import Message from "../Message";

type Listing = {
  id: number;
  product_id: string;
  title: string;
  price: string;
  description: string;
  image: string;
};

type ConfirmLayoutProps = {
  onHide: () => void;
  item: Listing;
  show: boolean;
};
type MessageType = {
  message: string;
  color: string;
};

export const ConfirmLayout = ({ item, onHide, show }: ConfirmLayoutProps) => {
  if (!show) {
    return null;
  }
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState<MessageType>({
    message: "",
    color: "",
  });
  const { title } = item;

  const handleConfirm = async () => {
    const baseApiUrl = import.meta.env.VITE_API_URL;
    try {
      setIsLoading(true);
      const response = await fetch(
        `${baseApiUrl}/api/products/${item.product_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      setIsLoading(false);
      console.log(response);
      setMessage({ message: "Listing Deleted Successfully", color: "green" });
    } catch (e) {
      setIsLoading(false);
      setIsError(true);
      setMessage({
        message: "There was an error Deleting your listing",
        color: "red",
      });
      console.error(e);
    }
    setTimeout(function () {
      setMessage({ message: "", color: "" });
      onHide();
    }, 2000);
  };
  const header = (
    <div>
      <h2>Delete {title} ?</h2>
    </div>
  );

  let content;
  if (isError) {
    content = (
      <Message message={{ message: "An error occurred", color: "red" }} />
    );
  }
  content = isLoading ? (
    <Loader isLoading={isLoading} />
  ) : (
    <Message message={message} />
  );
  const body = <div className="flex justify-center">{content}</div>;

  const footer = (
    <div>
      <button
        onClick={handleConfirm}
        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mt-2"
      >
        Confirm
      </button>
      <button
        onClick={onHide}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-2 ml-2"
      >
        Cancel
      </button>
    </div>
  );
  return { header, body, footer };
};
