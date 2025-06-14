import { useState, useEffect } from "react";
import "./ProductForm.css";
import visible from "../assets/btn_visibility_on_24px.png";
import invisible from "../assets/btn_visibility_off_24px.png";
import Button from "./Button";
import { uploadImage } from "../api";

const ProductForm = ({ index, type, onFormChange }) => {
  const [image, setImage] = useState(null);
  const [pwType, setPwType] = useState({
    type: "password",
    visible: false,
  });

  const [formData, setFormData] = useState({
    shopname: "",
    price: "",
    imageUrl: "",
    shopUrl: "",
    userId: "",
    password: "",
    productname: "",
    productUrl: "",
    userName: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
  };

  useEffect(() => {
    if (typeof onFormChange !== "function") return;

    const requiredFields =
      type === "shop"
        ? ["shopname", "imageUrl", "userId", "password", "shopUrl"]
        : ["productname", "price", "productUrl"];

    const isValid = requiredFields.every(
      //every는 requiredFields의 배열의 각각 요소를 field라는 이름으로 가져옴
      (field) => formData[field]?.trim() !== ""
    );
    //***formData[field] 설명***
    //[]를 쓰는 이유: 변수로 속성 접근 시는 [] 써야 하기 때문

    //예)const field = "url";
    //formData.url;  formData 객체의 "url" 속성 → O
    //formData["url"];  이것도 "url" 속성 → O
    //formData[field];  field가 "url"이므로 → formData["url"] → O
    //formData.field;  "field"라는 이름의 속성을 찾음 → X (undefined)

    //formData[field]는 value값이 들어감
    //formData={url: "https://example.com",}이면
    //formData[field]는 url이고, 그 값은"https://example.com"
    onFormChange(isValid, formData); //부모에게 전달
  }, [formData, type]); //type을 의존성 배열에 안 넣으면 type이 바뀌어도 useEffect가 실행되지 않아서 여전히 "product" 기준으로 검사함

  const handleImageChange = async (e) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (!file) return;

    try {
      const uploadedUrl = await uploadImage(file); // 이미지 업로드
      const updated = { ...formData };

      if (type === "shop") {
        updated.imageUrl = uploadedUrl;
      } else {
        updated.productUrl = uploadedUrl;
      }
      console.log(uploadedUrl);

      setFormData(updated);
      setImage(uploadedUrl); // 미리보기도 실제 업로드된 URL로 변경
    } catch (err) {
      console.error("이미지 업로드 실패:", err);
      alert("이미지 업로드에 실패했습니다.");
    }
  };

  const handlePasswordType = () => {
    setPwType(() => {
      if (!pwType.visible) {
        return { type: "text", visible: true };
      } else {
        return { type: "password", visible: false };
      }
    });
  };

  return (
    <form className="ProductForm">
      <p>{type === "shop" ? "쇼핑몰 대표 이미지" : "상품 대표 이미지"}</p>

      <label className="product-label" htmlFor={`inputForm-${index}`}>
        파일 첨부
        <input
          className="product-file"
          type="file"
          id={`inputForm-${index}`} //id="inputForm"처럼 id가 고정돼 있으면 여러 ProductForm이 있을 때 충돌날 수 있어서 ${index}로 유일한 값 만들기
          onChange={handleImageChange}
        />
      </label>

      {image ? (
        <div className="product-preview">
          <Button onClick={() => setImage(null)} type={"DELETE"} />
          <img src={image} alt="미리보기" width="100" />
        </div>
      ) : (
        <div className="product-preview-text">
          {type === "shop"
            ? "쇼핑몰 이미지를 첨부해주세요."
            : "상품 이미지를 첨부해주세요."}
        </div>
      )}

      <p>{type === "shop" ? "이름" : "상품 이름"}</p>
      <input
        type="text"
        name={type === "shop" ? "shopname" : "productname"}
        placeholder={
          type === "shop"
            ? "표시하고 싶은 이름을 적어 주세요."
            : "상품 이름을 입력해 주세요."
        }
        onChange={handleInputChange}
      />

      {type === "product" && (
        <>
          <p>상품 가격</p>
          <input
            type="text"
            name="price"
            placeholder="원화로 표기해 주세요."
            onChange={handleInputChange}
          />
        </>
      )}
      {type === "shop" && (
        <>
          <p>Url</p>
          <input
            type="text"
            name="shopUrl"
            placeholder="Url을 입력해 주세요."
            onChange={handleInputChange}
          />
          <p>유저 ID</p>
          <input
            type="text"
            name="userId"
            placeholder="유저 ID를 입력해 주세요."
            onChange={handleInputChange}
          />
          <p>비밀번호</p>
          <div className="pw-visible-btn">
            <input
              type={pwType.type}
              name="password"
              placeholder="비밀번호를 입력해 주세요."
              onChange={handleInputChange}
            />
            <span onClick={handlePasswordType}>
              {pwType.visible ? (
                <img src={visible} alt="비밀번호 보기" />
              ) : (
                <img src={invisible} alt="비밀번호 숨기기" />
              )}
            </span>
          </div>
        </>
      )}
    </form>
  );
};

export default ProductForm;
