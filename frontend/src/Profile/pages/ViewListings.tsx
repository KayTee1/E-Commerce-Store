import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import ListingCard from "../components/ListingCard";
import { useNavigate } from "react-router-dom";

const ViewListings = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [userListings, setUserListings] = useState([]);

  const fetchUserListings = async () => {
    const baseApiUrl = import.meta.env.VITE_API_URL;
    try {
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
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserListings();
  }, []);

  let content;

  userListings.length === 0
    ? (content = (
        <div className="flex flex-col text-center">
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
      ))
    : (content = userListings.map((listing: any) => (
        <ListingCard key={listing.id} listing={listing} />
      )));

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <h2 className="text-3xl font-bold mb-4">Your listings</h2>
      {content}
    </div>
  );
};

export default ViewListings;
