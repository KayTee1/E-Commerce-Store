import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../context/AuthContext";

import ListingCard from "../components/ListingCard";
import Loader from "../../../shared/Loader";
import Button from "../../../shared/Button";

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
        `${baseApiUrl}/api/users/listings/${auth.username}`,
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
      console.log(error);
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
        <p>There was an error fetching your listings</p>
      </div>
    );
  }

  if (userListings.length === 0) {
    content = (
      <div className="text-center">
        <p>You have no listings yet</p>
        <Button
          onClick={() => navigate("/create-listing")}
          variant="primary"
          content="Create your first listing"
          className="mt-3"
        />
      </div>
    );
  }

  if (!isError && userListings.length > 0) {
    let cols = userListings.length > 1 ? 2 : 1;
    content = (
      <div className={`mx-2 grid md:grid-cols-${cols} sm:grid-cols-1 gap-4 mx-16 justify-center`}>
        {userListings.map((listing: any) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <h2 className="text-3xl font-bold mb-3">Your listings</h2>
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
