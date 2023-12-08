import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import Navbar from "./components/Navbar/Navbar";
import Searchbar from "./components/Searchbar/Searchbar";
import Homepage from "./pages/Homepage/Homepage";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import Productpage from "./pages/Product/Productpage";
import ProfilePage from "./pages/Profile/ProfilePage";
import ProductsPage from "./pages/Products/ProductsPage";
import ProductPage from "./pages/Product/Productpage";
// import Chatbox from "./components/Chatbox/Chatbox";
// import ChatsNav from "./components/ChatsNav/ChatsNav";
import Settings from "./pages/Settings/Settings";
import Employee from "./pages/Employee/Employee";

import About from "./pages/About/About";
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
          <Route path="/product" element={<Productpage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
          <Route path="/employee" element={<Employee />} />

        </Routes>
      </BrowserRouter>
      {/* <ChatsNav />
      <Chatbox /> */}
    </>
  );
}

export default App;
