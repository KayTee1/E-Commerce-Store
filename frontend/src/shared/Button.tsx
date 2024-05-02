/*
Custom Button component!

Usage example:
<Button variant="primary" content="Click me" onClick={() => console.log("Clicked")} />
<Button variant="dangerous" content="Delete" onClick={() => console.log("Deleted")} 
  className="bg-gray-200" />

Note: The className prop is optional.
      The className prop is used to add additional classes to the button.
*/

import { twMerge } from "tailwind-merge";

type ButtonProps = {
  variant: "primary" | "dangerous";
  content: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
};
const Button = ({
  variant,
  content,
  onClick,
  className,
  type = "button",
}: ButtonProps) => {
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
    <button onClick={onClick} className={twMerge(style, className)} type={type}>
      {content}
    </button>
  );
};

export default Button;
