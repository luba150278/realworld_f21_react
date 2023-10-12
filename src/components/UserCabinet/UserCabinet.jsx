import { Button } from "react-bootstrap";
import styles from "./UserCabinet.module.css";
import { useState } from "react";
import EditUser from "../EditUser/EditUser";
import Posts from "../Posts/Posts";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from '../../share/reducers/authSlice';

export default function UserCabinet() {
  const [activeTab, setActiveTab] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <section>
      <div className="container">
        <h1>User Account</h1>
        <div className={styles.wrap}>
          <div className={styles.tabs}>
            <Button onClick={() => setActiveTab(1)}>Edit User Data</Button>
            <Button variant="success" onClick={() => setActiveTab(2)}>
              User Posts
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                dispatch(logout());
                navigate("/");
              }}
            >
              Logout
            </Button>
          </div>
          <div className={styles.main}>
            {activeTab === 1 && <EditUser />}
            {activeTab === 2 && <Posts variant={2} isChangePag={() => {}} />}
          </div>
        </div>
      </div>
    </section>
  );
}
