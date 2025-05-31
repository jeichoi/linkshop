import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NewProduct from "./pages/NewProduct";
import Notfound from "./pages/NotFound";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-product" element={<NewProduct />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
