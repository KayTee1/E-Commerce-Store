import { Route, Routes } from "react-router-dom";
import NavBar from "./shared/NavBar";
import Home from "./Home/pages/Home";
import Collections from "./Collections/pages/Collections";

export default function App() {
  return (
    <div className="">
      <NavBar />
      <main className="flex justify-center mx-5 my-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collections />} />
        </Routes>
      </main>
    </div>
  );
}
