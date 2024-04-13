type ListingType = {
  id: number;
  title: string;
  price: string;
  description: string;
  image: string;
};
type ListingCardProps = {
  listing: ListingType;
};

const ListingCard = ({ listing }: ListingCardProps) => {
  const { id, title, price, description, image } = listing;
  return (
    <div key={id} className="border border-gray-300 rounded-lg p-4 mb-4 w-96">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-500">${price}</p>
      <p>{description}</p>
      <img src={image} alt={title} className="w-full h-48 object-cover mt-2" />
    </div>
  );
};

export default ListingCard;
