import "./Header.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const Header = () => {
  const nav = useNavigate();

  return (
    <div className="Header">
      <img src={logo} alt="logo" />
      <Button
        text={"생성하기"}
        onClick={() => {
          nav("/linkpost");
        }}
        type={"CREATE"}
      />
    </div>
  );
};
export default Header;
