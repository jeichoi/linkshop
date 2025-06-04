import "./Header.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Header = ({ title }) => {
  const nav = useNavigate();

  return (
    <header className="Header">
      <img
        src={logo}
        alt="logo"
        onClick={() => {
          nav("/list");
          window.location.reload();
        }}
      />
      <div className="header_right">{title}</div>
    </header>
  );
};
export default Header;
