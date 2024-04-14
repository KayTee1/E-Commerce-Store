import { useCart } from "../../context/CartContext";

const Checkout = () => {
  const { cartState } = useCart();
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-4">Checkout</h2>

      <div className="flex flex-col items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 ">
          {cartState.items.map((item, index) => (
            <div>{item.title}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Checkout;