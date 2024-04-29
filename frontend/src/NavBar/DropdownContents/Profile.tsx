import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../../shared/Button";

const Profile = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  if (auth.isLoggedIn) {
    return (
      <div className="flex flex-col justify-between h-full">
        <div>
          <p className="text-2xl underline">Account</p>
          <div className="flex flex-col p-2 mt-5 max-h-60 overflow-scroll">
            <p className="text-xl">Welcome, {auth.username}</p>
            <div className="mt-3 flex flex-col gap-2 p-1 justify-between">
              <Button
                content="Create a new Listing"
                variant="primary"
                onClick={() => navigate("/create-listing")}
              />
              <Button
                content="View your Listings"
                variant="primary"
                onClick={() => navigate("/view-listings")}
              />
            </div>
          </div>
        </div>
        <Button variant="dangerous" content="Logout" onClick={auth.logout} />
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-between h-screen">
      <div>
        <p className="text-2xl underline">Account</p>
        <p className="text-xl mt-4">Log in to see your account</p>
      </div>
      <div className="flex flex-col gap-3">
        <Button
          content="Log in"
          variant="primary"
          onClick={() => navigate("/login")}
        />
        <Button
          content="Sign up"
          variant="primary"
          onClick={() => navigate("/signup")}
        />
      </div>
    </div>
  );
};

export default Profile;
