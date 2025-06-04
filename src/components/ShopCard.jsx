import "./ShopCard.css";
import { useState } from "react";
import likes_fill from "../assets/status_fill.png";
import likes_empty from "../assets/status_empty.png";
import shop_image from "../assets/image.png";
import product_image from "../assets/product.jpg";

const ShopCard = ({ item }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(item.likes);
  const handleLikeClick = () => {
    if (liked) {
      setLiked(false);
      setLikes(likes - 1);
    } else {
      setLiked(true);
      setLikes(likes + 1);
    }
  };

  return (
    <div className="ShopCard">
      <div className="ShopCard_wrapper">
        <img src={item.shop.imageUrl} />
        <div className="ShopCard_info">
          <h3>{item.shop.urlName}</h3>
          <div className="ShopCard_userid">@{item.userId}</div>
        </div>
        <div className="like" onClick={handleLikeClick}>
          <img src={liked ? likes_fill : likes_empty} alt="like button" />
          <span>{likes}</span>
        </div>
      </div>
      <div className="ShopCard_products">대표상품 {item.productsCount}</div>
      <div className="ShopCard_image">
        {/* 여기서부터 이미지 url 받아오고 뿌려주기   */}
        {item.products.map((product) => (
          <img
            key={product.id}
            src={product.imageUrl}
            alt={product.name}
            className="ShopCard_productImage"
          />
        ))}
      </div>
    </div>
  );
};
export default ShopCard;
