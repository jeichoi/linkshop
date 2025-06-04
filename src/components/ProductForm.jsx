import { useState } from "react";
import "./ProductForm.css";

const ProductForm = ({ index }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file); //createObjectURL 이미지 업로드 후 미리보기
      setImage(url);
    }
  };

  return (
    <form className="ProductForm">
      <p>상품 대표 이미지</p>

      <label className="product-label" htmlFor={`inputForm-${index}`}>
        파일 첨부
        <input
          className="product-file"
          type="file"
          id={`inputForm-${index}`} //id="inputForm"처럼 id가 고정돼 있으면 여러 ProductForm이 있을 때 충돌날 수 있어서 ${index}로 유일한 값 만들기
          onChange={handleImageChange}
        />
      </label>

      {image && (
        <div className="product-preview">
          <img src={image} alt="미리보기" width="100" />
        </div>
      )}

      <p>상품 이름</p>
      <input type="text" placeholder="상품 이름을 입력해 주세요." />

      <p>상품 가격</p>
      <input type="text" placeholder="원화로 표기해 주세요." />
    </form>
  );
};

export default ProductForm;
