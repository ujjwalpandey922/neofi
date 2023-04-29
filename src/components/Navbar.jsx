import "./navbar.css";

import logo from "../assets/neofi-logo.png";
const Navbar = () => {
  return (
    <div className="nav-container">
      <div className="nav-icons">
        <img src={logo} alt="activity" />
        <span>NeoFi</span>
      </div>
      <div className="nav-links ">
        <li>
          {" "}
          <span className="active"> Trade</span>{" "}
        </li>
        <li>Earn</li>
        <li>Support</li>
        <li>About</li>
      </div>
      <button className="connect-wallet">Connect Wallet</button>
    </div>
  );
};

export default Navbar;
