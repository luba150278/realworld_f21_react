import { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import styles from "./Login.module.css";
import { fetchAuth } from "../../share/reducers/fetch/auth";
import Error from "../Error/Error";

const initialState = {
  email: "",
  password: "",
};
export default function Login() {
  const loading = useSelector((state) => state.loader.loading);

  const dispath = useDispatch();
  const [formData, setFormData] = useState(initialState);
  const handlerSumbit = (e) => {
    e.preventDefault();
    dispath(fetchAuth({ body: formData, path: "/users/login" }));
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      {loading && <Spinner animation="border" variant="primary" />}
      <Error />

      <Form className={styles.form} onSubmit={(e) => handlerSumbit(e)}>
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
          Login
        </Button>
      </Form>
    </>
  );
}
