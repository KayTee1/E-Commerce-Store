import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const auth = useContext(AuthContext);

  const getFavorites = async () => {
    console.log(auth.userId);
    try {
      const res = await fetch("/api/favorites/" + auth.userId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        },
      });
      const data = await res.json();
      console.log(data);
      setFavorites(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (auth.isLoggedIn) {
    getFavorites();
    console.log(favorites);
    return (
      <div>
        <p className="text-2xl underline">Favorites</p>
        <div className="flex flex-col p-2 mt-5 max-h-72 overflow-scroll">
          {favorites.map((item, index: number) => (
            <p>hi</p>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div>
      <p className="text-2xl underline">Favorites</p>
      <div className="flex flex-col p-2 mt-5 max-h-72 overflow-scroll">
        <p className="text-xl">Log in to see your favorites</p>
      </div>
    </div>
  );
};

export default Favorites;
