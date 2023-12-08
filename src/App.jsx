import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import Navbar from "./components/Navbar/Navbar";
import Searchbar from "./components/Searchbar/Searchbar";
import ProfilePage from "./pages/Profile/ProfilePage"; 
import ProductsPage from "./pages/Products/ProductsPage";
import ProductPage from "./pages/Product/ProductPage";
import Chatbox from "./components/Chatbox/Chatbox";
import ChatsNav from "./components/ChatsNav/ChatsNav";
import Settings from "./pages/Settings/Settings";


import About from "./pages/About/About";
function App() {
  return (
    <>
      <Navbar>
        <Searchbar />
      </Navbar>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
      <ChatsNav />
      <Chatbox />
    </>
  );
}

export default App;
