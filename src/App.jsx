import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import Navbar from "./components/Navbar/Navbar";
import Searchbar from "./components/Searchbar/Searchbar";
import Homepage from "./pages/Homepage/Homepage";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
function App() {
  return (
    <>
      <Navbar>
        <Searchbar />
      </Navbar>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
