import "./SearchBar.css";
import search from "../assets/search.png";
const SearchBar = () => {
  return (
    <div className="SearchBar">
      <img src={search} alt="search" className="search-icon" />
      <input placeholder="샵 이름으로 검색해 보세요." />
    </div>
  );
};
export default SearchBar;
