import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
  useState,
  useEffect,
  createContext,
  useContext,
  useReducer,
  useRef,
} from "react";
import Home from "./pages/Home";
import LinkPost from "./pages/LinkPost";
import Notfound from "./pages/NotFound";
import { getItems, createReview } from "./api";

export const ItemsContext = createContext([]);
export const ItemsDispatchContext = createContext([]);
export const useItems = () => useContext(ItemsContext);

function reducer(state, action) {
  let nextState;
  switch (action.type) {
    case "INIT":
      return action.items;
    case "CREATE": {
      nextState = [action.items, ...state];
      break;
    }
    default:
      return state;
  }
  return nextState;
}

function App() {
  //const [items, setItems] = useState([]);
  const [items, dispatch] = useReducer(reducer, []);
  //const isRef = useRef(0);

  const handleLoad = async () => {
    const { list } = await getItems();

    dispatch({
      type: "INIT",
      items: list,
    });
  };

  useEffect(() => {
    handleLoad();
  }, []);

  const onCreate = async (shopCreate) => {
    try {
      const { shop, products } = shopCreate;

      const shopCreate1 = {
        shop: {
          imageUrl: shop.imageUrl,
          urlName: shop.shopname,
          shopUrl: shop.shopUrl,
        },
        products: products.map((product) => ({
          price: Number(product.price),
          imageUrl: product.productUrl,
          name: product.productname,
        })),
        password: shop.password,
        userId: shop.userId,
        name: shop.userName||"아무나",
      };
      const result = await createReview(shopCreate1);

      dispatch({
        type: "CREATE",
        items: result,
      });
    } catch (error) {
      console.error(error);
      alert("리뷰 생성 실패!");
    }
  };

  return (
    <ItemsContext.Provider value={items}>
      <ItemsDispatchContext.Provider value={{ onCreate }}>
        <Routes>
          <Route path="/list" element={<Home />} />
          <Route path="/linkpost" element={<LinkPost />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </ItemsDispatchContext.Provider>
    </ItemsContext.Provider>
  );
}

export default App;
