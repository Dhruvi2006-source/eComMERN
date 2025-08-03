import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Componants/Navbar";
import Home from "./Home";
import Footer from "./Componants/Footer";
import ProductPage from "./Componants/ProductDetails";
import Cart from "./Componants/Cart";
// import Profile from "./Componants/Profile";
import Cards from "./Componants/Cards";
import Signup from "./Componants/SignUp";
import Login from "./Componants/Login";
import Orders from "./Componants/Orders";
// import Cards from "./Componants/Cards";

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
        <Route path="/orders" element= {<Orders/>}/>
        <Route path="/products" element={<Cards />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
