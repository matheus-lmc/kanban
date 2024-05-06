import Logo from "../../assets/logo.svg";
import DevLogo from "../../assets/dev-logo.svg";

import "./styles.css";

function Header() {
  return (
    <div className="header-container">
      <img src={Logo} className="main-logo" alt="Kanban" />
      <img src={DevLogo} className="dev-logo" alt="matheus-lmc" />
    </div>
  );
}

export default Header;
