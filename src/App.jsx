import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect, createContext, useContext } from "react";
import Home from "./pages/Home";
import LinkPost from "./pages/LinkPost";
import Notfound from "./pages/NotFound";
import { getItems } from "./api";

export const ItemsContext = createContext([]);
export const useItems = () => useContext(ItemsContext);

function App() {
  const [items, setItems] = useState([]);
  const handleLoad = async () => {
    const { list } = await getItems();
    
    setItems(list);
  };
  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <ItemsContext.Provider value={items}>
      <Routes>
        <Route path="/list" element={<Home />} />
        <Route path="/linkpost" element={<LinkPost />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </ItemsContext.Provider>
  );
}

export default App;
