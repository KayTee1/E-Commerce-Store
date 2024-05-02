import { useNavigate } from "react-router-dom";

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
};

const OrderSummary = ({ products }: OrderSummaryProps) => {
  const navigate = useNavigate();
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
                  <select value={product.quantity}>
                    {[...Array(10).keys()].map((index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <p className="text-lg font-semibold">{product.price}€</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderSummary;
