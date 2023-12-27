import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import Navbar from "./components/Navbar/Navbar";
import Searchbar from "./components/Searchbar/Searchbar";
import ProfilePage from "./pages/Profile/ProfilePage";
import Homepage from "./pages/Homepage/Homepage";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import ProductPage from "./pages/Product/ProductPage";
import ProductsPage from "./pages/Products/ProductsPage";
// import Chatbox from "./components/Chatbox/Chatbox";
// import ChatsNav from "./components/ChatsNav/ChatsNav";
import Settings from "./pages/Settings/Settings";
import Employee from "./pages/Employee/Employee";
import Reports from "./pages/Reports/Reports";
import Barter from "./pages/Barter/Barter";

import About from "./pages/About/About";
import AuctionsPage from "./pages/Auctions/AuctionsPage";
import SignupPage from "./pages/Signup/SignupPage";
import AddProductPage from "./pages/AddProduct/AddProductPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar>
          <Searchbar />
        </Navbar>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          {/* <Route path="/product" element={<ProductPage />} /> */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/auctions" element={<AuctionsPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="employee/reports" element={<Reports />} />
          <Route path="/barter" element={<Barter />} />

          <Route path="/signup" element={<SignupPage />} />
          <Route path="/addproduct" element={<AddProductPage />} />
          {/* <Route path="*" element={<AddProductPage />} /> */}
        </Routes>
      </BrowserRouter>
      {/* <ChatsNav />
      <Chatbox /> */}
    </>
  );
}

export default App;
