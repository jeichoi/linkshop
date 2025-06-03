import "./ShopList.css";
import ShopCard from "../components/ShopCard";
import { useItems } from "../App";

const ShopList = () => {
  const items = useItems();
  if (!items || items.length === 0) {
    return <p>로딩 중이거나 데이터가 없습니다.</p>;
  }

  return (
    <div className="ShopList">
      {items.map((item) => (
        <ShopCard key={item.id} item={item} />
      ))}
    </div>
  );
};
export default ShopList;
