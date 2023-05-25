import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGift } from "react-icons/fa";

const NavbarTop = ({ sessionHandler }) => {
  const navigate = useNavigate();
  const user = sessionHandler.getActiveSession();
  useEffect(() => {
    typeof document !== undefined
      ? import("bootstrap/dist/js/bootstrap")
          .then(() => console.log("Bootrap javascript library loaded"))
          .catch((error) =>
            BsController.log("Failed to load Boostrap javascript", error)
          )
      : null;
  }, []); // This javascript is needed to make the Navbar work!

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <FaGift />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                À propos
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/help"
                tabIndex="-1"
                aria-disabled="true"
              >
                Aide
              </Link>
            </li>
          </ul>
          <form className="d-flex">
            {user ? (
              <>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Bienvenue <b>{user.firstname}</b>
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <button
                          className="dropdown-item btn"
                          onClick={(e) => {
                            e.preventDefault();

                            navigate("/profil");
                          }}
                        >
                          Profil
                        </button>
                      </li>
                      <li>
                        <hr className="dropdown-divider"></hr>
                      </li>
                      <li>
                        <button
                          className="dropdown-item btn"
                          onClick={(e) => {
                            e.preventDefault();
                            sessionHandler.deleteSession();
                            navigate("/login");
                          }}
                        >
                          Se déconnecter
                        </button>
                      </li>
                    </ul>
                  </li>
                </ul>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="btn btn-outline-success" type="submit">
                    Login
                  </button>
                </Link>
              </>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
};

export default NavbarTop;
