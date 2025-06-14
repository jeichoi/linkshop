import Header from "../components/Header";

import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import ProductList from "../components/ProductList";
import { ItemsDispatchContext } from "../App";
import { useContext } from "react";

const LinkPost = () => {
  const nav = useNavigate();
  const { onCreate } = useContext(ItemsDispatchContext);

  const onSubmit = (shopCreate) => {
    console.log("input", shopCreate);
    onCreate(shopCreate);
    nav("/list", { replace: true });
  };
  return (
    <div>
      <Header
        title={
          <Button
            text={"돌아가기"}
            onClick={() => {
              nav("/list");
            }}
            type={"CREATE"}
          />
        }
      />
      <ProductList onSubmit={onSubmit} />
    </div>
  );
};
export default LinkPost;
