import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Home,
  Contact,
  Admin,
  Login,
  Register,
  Cart,
  Orders,
  ResetPassword,
  CheckoutSuccess,
  Dashboard,
  Products
} from "./pages/index";
import Header from "./components/header/Header";

const App = () => {
  

  return (
    <div className="main">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
          
          </Route>
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path='/checkoutSuccess' element={<CheckoutSuccess />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
