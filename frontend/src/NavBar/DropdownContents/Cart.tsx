import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import DropdownItem from "../components/DropdownItem";
import Button from "../../shared/Button";

type ItemTypes = {
  id: number;
  product_id: string;
  title: string;
  description: string;
  price: string;
  owner: string;
  image: string;
  quantity?: number;
};

const Cart = () => {
  const { cartState, handleEmptyCart: empty } = useCart();
  const navigate = useNavigate();

  const handleEmptyCart = () => {
    empty();
  };

  const handleNavToCheckout = () => {
    if (cartState.items.length === 0) return;
    navigate("/checkout");
  };
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <p className="text-2xl underline">Cart</p>
        <div className="flex flex-col p-2 mt-5 max-h-60 overflow-scroll">
          {cartState.items.length === 0 ? (
            <p className="text-xl">Cart is empty</p>
          ) : (
            cartState.items.map((item: ItemTypes) => (
              <DropdownItem key={item.id} item={item} type="cart" />
            ))
          )}
        </div>
      </div>
      <div className="flex flex-row mt-4 gap-3 justify-center">
        <Button
          variant="primary"
          content="Checkout"
          onClick={handleNavToCheckout}
        />
        <Button
          variant="dangerous"
          content="Empty Cart"
          onClick={handleEmptyCart}
        />
      </div>
    </div>
  );
};

export default Cart;
