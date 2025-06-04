import "./ProductList.css";
import { useState } from "react";
import ProductForm from "./ProductForm";
import Button from "./Button";

const ProductList = () => {
  const [products, setProducts] = useState([{}]);

  const addProduct = () => {
    setProducts([...products, {}]);
  };

  return (
    <div className="ProductList">
      <div className="Product-top">
        <h2>대표 상품</h2>
              <Button text={"추가"} onClick={addProduct} type={"ADD"} />
      </div>
      <div className="Product-list">
        {products.map((_, index) => (
          <ProductForm key={index} index={index} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
