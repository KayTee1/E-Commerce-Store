import { CgHeart } from "react-icons/cg";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";

type DropdownItemProps = {
  title: string;
};
const DropdownItem = ({ title }: DropdownItemProps) => {
  return (
    <div className="w-full p-3 my-1 bg-red-100">
      <div className="flex flex-row items-baseline justify-between">
        <p>{title}</p>
        <div className="flex flex-row w-9 justify-between">
          <button>
            <CgHeart />
          </button>
          <button>
            <MdOutlineRemoveShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DropdownItem;
