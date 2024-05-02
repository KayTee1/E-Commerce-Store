import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../Loader";
import Message from "../Message";
import Button from "../Button";

type Listing = {
  id: number;
  product_id: string;
  title: string;
  price: string;
  description: string;
  image: string;
};

type DeleteLayoutProps = {
  onHide: () => void;
  item: Listing;
  show: boolean;
};
type MessageType = {
  message: string;
  color: "red" | "green" | "";
};

export const DeleteLayout = ({ item, onHide, show }: DeleteLayoutProps) => {
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
  const { title, product_id } = item;

  const handleConfirm = async () => {
    const baseApiUrl = import.meta.env.VITE_API_URL;
    try {
      setIsLoading(true);
      const response = await fetch(`${baseApiUrl}/api/products/${product_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("An error occurred");
      }
      setMessage({ message: "Listing Deleted Successfully", color: "green" });
    } catch (e) {
      setIsError(true);
      setMessage({
        message: "There was an error Deleting your listing",
        color: "red",
      });
      console.log(e);
    } finally {
      setIsLoading(false);
    }
    setTimeout(function () {
      setMessage({ message: "", color: "" });
      window.location.reload();
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
    <div className="flex flex-row gap-4">
      <Button
        onClick={() => {
          handleConfirm();
        }}
        variant="dangerous"
        content="Confirm"
      />
      <Button
        onClick={() => {
          onHide();
        }}
        variant="primary"
        content="Cancel"
      />
    </div>
  );
  return { header, body, footer };
};
