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
        <img src={shop_image} />
        <div className="ShopCard_info">
          <h3>{item.name}</h3>
          <div className="ShopCard_userid">@{item.userId}</div>
        </div>
        <div className="like" onClick={handleLikeClick}>
          <img src={liked ? likes_fill : likes_empty} alt="like button" />
          <span>{likes}</span>
        </div>
      </div>
      <div className="ShopCard_products">대표상품 {item.productsCount}</div>
      <div className="ShopCard_image">
        <img src={product_image} />
      </div>
    </div>
  );
};
export default ShopCard;
