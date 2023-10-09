import { Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState } from "react";

const initialState = {
    email: "",
    username: "",
    bio: "",
    image: ""
  };
export default function EditUser() {
    const username = useSelector((state) => state.auth.username);
    //const dispatch = useDispatch();

    const [formData, setFormData] = useState(initialState);
    const handlerSumbit = (e) => {
      e.preventDefault();
      //dispatch(fetchAuth({ body: formData, path: "/users/login" }));
    };
  
    const changeHandler = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  return (
    <div className="container">
      <h1>Edit User - {username}</h1>
      <Form>
      <Form.Group className="mb-3" onSubmit={(e) => handlerSumbit(e)}>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="name@example.com"
            onChange={(e) => changeHandler(e)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control

            name="username"
            placeholder="username"
            onChange={(e) => changeHandler(e)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Bio</Form.Label>
          <Form.Control

            name="bio"
            placeholder="bio"
            onChange={(e) => changeHandler(e)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>User Photo</Form.Label>
          <Form.Control

            name="image"
            placeholder="image"
            onChange={(e) => changeHandler(e)}
          />
        </Form.Group>

        <Button variant="primary" className="mb-3" type="submit">
          Edit User Data
        </Button>
      </Form>
    </div>
  );
}
