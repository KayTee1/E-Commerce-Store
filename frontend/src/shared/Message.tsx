import { twMerge } from "tailwind-merge";

/*

Example of usage: 
  INIT:
  type MessageType = {
    message: string;
    color: "red" | "green" | "";
  };

  const [message, setMessage] = useState<MessageType>({
    message: "",
    color: "",
  });

  USAGE:
  setMessage({ message: "Your cart is empty!", color: "red" });

  <Message message={message}/>

  Note: The className prop is optional.
        Use the className prop to add additional classes to the message.
*/
type MessageProps = {
  message: {
    message: string;
    color: "red" | "green" | "";
  };
  className?: string;
};

const Message: React.FC<MessageProps> = ({ message, className }) => {
  let color;
  switch (message.color) {
    case "red":
      color = "text-red-500";
      break;
    case "green":
      color = "text-green-600";
      break;
  }
  return (
    <div>
      <p className={twMerge(color, className)}>{message.message}</p>
    </div>
  );
};

export default Message;
