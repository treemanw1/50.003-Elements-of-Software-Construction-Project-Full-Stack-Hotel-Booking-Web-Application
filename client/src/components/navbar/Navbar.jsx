import "./navbar.css";
import logo from "../../components/navbar/ascenda.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleDestinationSearch = () => {
    navigate("/", { state: {} });
  };
  const handleHotelSearch = () => {
    navigate("/hotels", { state: {} });
  };
  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <div className="logoContainer">
          <div className="childLogoContainer">
            {/* <div className="logoImage">
              <img src={logo} alt="Logo" />
            </div> */}
            <button data-testid="trivago" className="logo" onClick={handleDestinationSearch}>
            <img src={logo} alt="Logo" height="20" width="100"/>
            </button>
          </div>
        </div>
        <div className="navItems">
          
          <button data-testid= "RegBtn" className="navButton" onClick={handleRegister}>
            Register
          </button>
          <button data-testid= "LoginBtn" className="navButton" onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
