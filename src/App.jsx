import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import Navbar from "./components/Navbar/Navbar";
import Searchbar from "./components/Searchbar/Searchbar";
import ProductCard from "./components/ProductCard/ProductCard";
function App() {
  return (
    <>
      <Navbar>
        <Searchbar />
      </Navbar>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/product" element={<ProductCard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
