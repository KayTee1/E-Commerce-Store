import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";

type Product = {
  id: number;
  product_id: string;
  title: string;
  description: string;
  price: string;
  owner: string;
  image: string;
  quantity?: number;
};

type OrderSummaryProps = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

const OrderSummary = ({ products, setProducts }: OrderSummaryProps) => {
  const navigate = useNavigate();
  const { setQuantity } = useCart();

  const handleUpdateQuantity = (product_id: string, quantity: number) => {
    const updatedProducts = products.map((product) => {
      if (product.product_id === product_id) {
        setQuantity(product, quantity);
        return { ...product, quantity };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  return (
    <div>
      <div className="flex flex-col">
        {products.map((product: Product) => (
          <div
            key={product.id}
            className="flex flex-row justify-between items-center my-4"
          >
            <div className="flex flex-row items-center gap-4">
              <img
                onClick={() => {
                  navigate(`/products/${product.product_id}`);
                }}
                src={product.image}
                alt={product.title}
                className="cursor-pointer w-16 h-16 object-cover rounded-lg"
              />
              <div>
                <h4 className="text-lg font-semibold max-w-32">
                  {product.title}
                </h4>
                <div className="text-sm text-gray-500">
                  <span>Qty:</span>
                  <select
                    className="ml-2 rounded-lg p-1"
                    value={product.quantity}
                    onChange={(e) => {
                      handleUpdateQuantity(
                        product.product_id,
                        parseInt(e.target.value)
                      );
                    }}
                  >
                    {[...Array(10).keys()].map((index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <p className="text-lg font-semibold">
              {parseFloat(product.price) * (product.quantity || 1)}€
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderSummary;
