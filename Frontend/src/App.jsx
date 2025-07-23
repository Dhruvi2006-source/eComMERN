import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Componants/Navbar";
import Home from "./Home";
import Footer from "./Componants/Footer";
import ProductPage from "./Componants/ProductDetails";
import Cart from "./Componants/Cart";
import Profile from "./Componants/Profile";
import Cards from "./Componants/Cards";

function App() {
  return (
    <>
      <div className="mb-2 sticky top-0 z-50 bg-white/30 backdrop-blur-xl border border-white/20 shadow-lg">
        <Navbar />
      </div>

      <Routes>
        <Route path="/" element={<Home />} className="mt-1.5" />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products" element={<Cards />} />
      </Routes>
      <div className="mt-2.5">
        <Footer />
      </div>
    </>
  );
}

export default App;
