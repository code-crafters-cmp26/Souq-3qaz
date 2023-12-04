import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import Navbar from "./components/Navbar/Navbar";
import Searchbar from "./components/Searchbar/Searchbar";
import ProductsPage from "./pages/Products/ProductsPage";
import ProductPage from "./pages/Product/ProductPage";
function App() {
  return (
    <>
      <Navbar>
        <Searchbar />
      </Navbar>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product" element={<ProductPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
