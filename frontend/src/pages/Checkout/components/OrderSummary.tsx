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
  return (
    <div>
      <div className="flex flex-col">
        {products.map((product) => (
          <div
            key={product.product_id}
            className="flex flex-row justify-between"
          >
            <p>{product.title}</p>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderSummary;
