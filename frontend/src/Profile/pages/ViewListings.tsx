import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import ListingCard from "../components/ListingCard";
import { useNavigate } from "react-router-dom";
import Loader from "../../shared/Loader";

type Listing = {
  id: number;
  title: string;
  description: string;
  price: string;
  owner: string;
  image: string;
  quantity?: number;
};

const ViewListings = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [userListings, setUserListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const fetchUserListings = async () => {
    const baseApiUrl = import.meta.env.VITE_API_URL;
    try {
      setIsLoading(true);
      const response = await fetch(
        `${baseApiUrl}/api/users/listings/${auth.userId}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      const data = await response.json();
      setUserListings(data);
    } catch (error) {
      setIsError(true);
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUserListings();
  }, []);

  let content;

  if (isError) {
    content = (
      <div className="text-center">
        <p>There was an error fetching the data</p>
      </div>
    );
  }

  if (userListings.length === 0) {
    content = (
      <div className="text-center">
        <p>You have no listings yet</p>
        <button
          onClick={() => {
            navigate("/create-listing");
          }}
          className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Create your first listing
        </button>
      </div>
    );
  }

  if (!isError && userListings.length > 0) {
    content = (
      <div
        className={`mt-8 grid lg:grid-cols-3 md:grid-cols-2 gap-3 ${
          userListings.length === 1 ? "grid-cols-1 justify-center" : ""
        }`}
      >
        {userListings.map((listing: any) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <h2 className="text-3xl font-bold mb-4">Your listings</h2>
      {isLoading ? (
        <div className="flex justify-center">
          <Loader isLoading={isLoading} />
        </div>
      ) : (
        content
      )}
    </div>
  );
};

export default ViewListings;
