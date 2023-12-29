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
import AllBarters from "./pages/AllBarters/AllBarters";
//import NotFound from "./pages/NotFound/NotFound";

import About from "./pages/About/About";
import AuctionsPage from "./pages/Auctions/AuctionsPage";
import SignupPage from "./pages/Signup/SignupPage";
import AddProductPage from "./pages/AddProduct/AddProductPage";
import AddAuctionPage from "./pages/AddAuction/AddAuctionPage";
import { useEffect } from "react";
import { io } from "socket.io-client";
function App() {
  useEffect(() => {
    const socket = io("http://127.0.0.1:3000", {
      query: {
        jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzAzNjU3OTczLCJleHAiOjE3MTE0MzM5NzN9.wfje26Seyb0D0r9L8nbIQYyZx5B-LF71skuYa2mhJ6w",
      },
    });

    // Handle connection events
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    // Listen for custom events from the server
    socket.on("serverResponse", () => {
      console.log("rec data");
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);
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
          <Route path="/products" element={<ProductsPage ofseller={0} />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/auctions" element={<AuctionsPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="employee/reports" element={<Reports />} />
          <Route path="/barter" element={<Barter />} />
          <Route path="/barters" element={<AllBarters />} />

          <Route path="/signup" element={<SignupPage />} />
          <Route path="/addproduct" element={<AddProductPage />} />
          <Route path="/addauction/:id" element={<AddAuctionPage />} />
          <Route path="/myproducts" element={<ProductsPage ofseller={1} />} />

          {/* <Route path="*" element={<AddProductPage />} /> */}
        </Routes>
      </BrowserRouter>
      {/* <ChatsNav />
      <Chatbox /> */}
    </>
  );
}

export default App;
