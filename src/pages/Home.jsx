import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import ShopList from "../components/ShopList";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const nav = useNavigate();
  return (
    <div>
      <Header
        title={
          <Button
            text={"생성하기"}
            onClick={() => {
              nav("/linkpost");
            }}
            type={"CREATE"}
          />
        }
      />
      <SearchBar />
      <ShopList />
    </div>
  );
};
export default Home;
