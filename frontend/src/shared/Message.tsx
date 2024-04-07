/*

Example of usage: 
  INIT:
  type MessageType = {
    message: string;
    color: string;
  };

  const [message, setMessage] = useState<MessageType>({
    message: "",
    color: "",
  });

  USAGE:
  setMessage({ message: "Your cart is empty!", color: "red" });

  <Message message={message}/>
*/
type MessageProps = {
  message: {
    message: string;
    color: string;
  };
};

const Message: React.FC<MessageProps> = ({ message }) => {
  return (
    <div>
      <p style={{ color: message.color }}>{message.message}</p>
    </div>
  );
};

export default Message;