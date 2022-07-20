import "./navbar.css";
import logo from "../../components/navbar/logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleDestinationSearch = () => {
    navigate("/", { state: {} });
  };
  const handleHotelSearch = () => {
    navigate("/hotels", { state: {} });
  };
  const handleRoomSearch = () => {
    navigate("/hotels/sad", { state: {} });
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <div className="logoContainer">
          <div class="childLogoContainer">
            <div className="logoImage">
              <img src={logo} alt="Logo" />
            </div>
            <button className="logo" onClick={handleDestinationSearch}>
              Trivago
            </button>
          </div>
        </div>
        <div className="navItems">
          <button className="navButton" onClick={handleHotelSearch}>
            Hotel Search
          </button>
          <button className="navButton" onClick={handleRoomSearch}>
            Room Search
          </button>
          <button className="navButton">Login</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
