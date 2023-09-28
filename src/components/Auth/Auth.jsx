import { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import styles from "./Auth.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth } from "../../share/reducers/authSlice";

const initialState = {
  username: "",
  email: "",
  password: "",
};
export default function Auth() {
  const { loading, error } = useSelector((state) => state.auth);
  const dispath = useDispatch();
  const [formData, setFormData] = useState(initialState);
  const handlerSumbit = (e) => {
    e.preventDefault();
    dispath(fetchAuth(formData));
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  console.log(error)
  return (
    <div className="container">
      {loading && <Spinner animation="border" variant="primary" />}
      {!loading && (
        <Form className={styles.form} onSubmit={(e) => handlerSumbit(e)}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              placeholder="Enter username"
              onChange={(e) => changeHandler(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="name@example.com"
              onChange={(e) => changeHandler(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={(e) => changeHandler(e)}
            />
          </Form.Group>

          <Button variant="primary" className="mb-3" type="submit">
            Registration
          </Button>
        </Form>
      )}
      {error.message && <p>ERROR</p>}
    </div>
  );
}
