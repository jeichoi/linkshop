import Header from "../components/Header";

import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import ProductList from "../components/ProductList";

const LinkPost = () => {
  const nav = useNavigate();
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
      <ProductList />
    </div>
  );
};
export default LinkPost;
