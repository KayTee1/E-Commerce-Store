import { Link } from "react-router-dom";

type ProductListingProps = {
  product: {
    title: string;
    description: string;
    price: string;
    owner: string;
  };
};

const ProductListingCard = ({ product }: ProductListingProps) => {
  const { title, description, price } = product;
  return (
    <Link
      to="/product/1"
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg"
    >
      <img
        src="https://via.placeholder.com/250"
        alt="Product 1"
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col w-64">
        <div className="flex flex-row items-baseline justify-between ">
          <h3 className="text-lg font-semibold mb-2 ">{title}</h3>
          <p className="text-gray-600">{price} €</p>
        </div>
        <p className="w-48">{description}</p>
      </div>
    </Link>
  );
};

export default ProductListingCard;
