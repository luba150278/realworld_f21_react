import { FiLogIn } from "react-icons/fi";
import styles from "./Header.module.css";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <div className="container">
        <div className={styles.wrap}>
          <h1>Logo</h1>
          <div>
            <Link to="/auth">
              <IconContext.Provider
                value={{ color: "white", className: "login-icon" }}
              >
                <FiLogIn />
              </IconContext.Provider>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
