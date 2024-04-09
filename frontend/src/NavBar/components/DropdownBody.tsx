import Cart from "../../shared/DropdownContents/Cart";
import Favorites from "../../shared/DropdownContents/Favorites";
import Profile from "../../shared/DropdownContents/Profile";

type DropdownBodyProps = {
  type: "favorites" | "cart" | "profile";
};
const DropdownBody = ({ type }: DropdownBodyProps) => {
  let content;
  switch (type) {
    case "favorites":
      content = <Favorites />;
      break;
    case "cart":
      content = <Cart />;
      break;
    case "profile":
      content = <Profile />;
      break;
  }

  return <div className="flex flex-col p-4 w-72 h-96 ">{content}</div>;
};

export default DropdownBody;
