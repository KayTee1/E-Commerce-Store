import Cart from "../DropdownContents/Cart";
import Favorites from "../DropdownContents/Favorites";
import Profile from "../DropdownContents/Profile";

type DropdownBodyProps = {
  type: "favorites" | "cart" | "profile";
  isSmallScreen: boolean;
  handleCloseDropdown: () => void;
};

const DropdownBody = ({
  type,
  isSmallScreen,
  handleCloseDropdown,
}: DropdownBodyProps) => {
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
  return (
    <div className="flex flex-col p-4 w-72 h-96 bg-white rounded-lg ">
      {isSmallScreen && (
        <button className="self-end" onClick={handleCloseDropdown}>
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      )}
      {content}
    </div>
  );
};

export default DropdownBody;
