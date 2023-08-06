import {Link} from "react-router-dom";
import NavbarMenu from "./NavbarMenu";

const Header = () => {
  return(
      <div className="header-wrapper">
          <header className="mx-5">
              <div className="navbar-wrapper">
                  <div className="container">
                      <div className="navbar navbar-light">
                          <div className="site-logo">
                              <Link to="/"> <img src="assets/images/logo.png" alt="Saleshub Logo"/> </Link>
                          </div>

                          <NavbarMenu/>

                      </div>
                  </div>
              </div>

          </header>
      </div>
  )
}

export default Header;