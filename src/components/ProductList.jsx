import "./ProductList.css";
import { useState } from "react";
import ProductForm from "./ProductForm";
import Button from "./Button";

const ProductList = () => {
  const [products, setProducts] = useState([{}]);
  const [productValidStates, setProductValidStates] = useState([false]); // 상품 유효성-추가 되는 형태라서 []리스트 형태, 첫 값음 false
  const [isShopFormValid, setIsShopFormValid] = useState(false); // 쇼핑몰 유효성

  const addProduct = () => {
    setProducts([...products, {}]); //추가 버튼
    setProductValidStates([...productValidStates, false]); // 추가버튼 누르면 버튼 false가 list에 추가 - 생성하기 버튼이 추가 버튼 누르면 비활성화 됨
  };
    
    

  //ProductForm component 에서 true인지 false인지 값을 가져올 때 product와 shop 값을 따로 가져와야함 (이걸 구현하는게 어려웠음.)
  //product는 추가되는 형태라서 추가 버튼을 누르면 기존 form에 값이 다 채워져서 true가되더라도 다시 false값으로 변경되야함.
  //handleProductFormChange와 handleShopFormChange로 구현함.

  // isValid는 ProductForm에서 계산해서 ProductList로 넘기는 값
  const handleProductFormChange = (index, isValid) => {
    const updatedStates = [...productValidStates];
    updatedStates[index] = isValid;
    setProductValidStates(updatedStates);
  };

  const handleShopFormChange = (isValid) => {
    setIsShopFormValid(isValid);
  };

  const isAllValid = isShopFormValid && productValidStates.every(Boolean);
  //1. every()는 Boolean 함수를 배열에 적용해서 배열의 모든 값이 참(true)이면 true를 반환(every()는 배열의 모든 요소가 true인지 확인하는 메서드)
  //2. isShopFormValid이 true면 &&으로 왼쪽값을 확인 (&&는 AND 연산자로, 왼쪽이 true일 때만 오른쪽을 평가)
  //3. productValidStates를 .every(Boolean)로 모든값이 true인지 확인
  //4. 풀어쓰면 productValidStates.every((value) => Boolean(value)); Boolean이 콜백 함수로 사용되고 있기 때문에, 배열의 각 요소가 Boolean(value)으로 평가됨. 즉, 각 요소가 "truthy"한지를 검사하는 것

  return (
    <div className="ProductList">
      <div className="Product-top">
        <h2>대표 상품</h2>
        <Button text={"추가"} onClick={addProduct} type={"ADD"} />
      </div>
      <div className="Product-list">
        {products.map((_, index) => (
          <ProductForm
            key={index}
            index={index}
            type="product"
            onFormChange={(isValid) => handleProductFormChange(index, isValid)}
            // isValid는 ProductForm에서 계산해서 ProductList로 넘기는 값
          />
        ))}
      </div>
      <div className="Product-top">
        <h2>내 쇼핑몰</h2>
      </div>
      <div className="Product-list">
        <ProductForm type="shop" onFormChange={handleShopFormChange} />
      </div>
      <Button
        text={"생성하기"}
        type={isAllValid ? "CREATED_LARGE" : "CREATED_LARGE_DISABLED"}
        disabled={!isAllValid}
      />
    </div>
  );
};

export default ProductList;
