/*
Custom Button component!

Usage example:
<Button variant="primary" content="Click me" onClick={() => console.log("Clicked")} />
<Button variant="dangerous" content="Delete" />

Note: The onClick prop is optional.
*/

type ButtonProps = {
  variant: "primary" | "dangerous";
  content: string;
  onClick?: () => void;
};
const Button = ({ variant, content, onClick }: ButtonProps) => {
  let style: string;
  switch (variant) {
    case "primary":
      style = "bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded";
      break;
    case "dangerous":
      style = "bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded";
      break;
  }
  return (
    <button onClick={onClick} className={style}>
      {content}
    </button>
  );
};

export default Button;
