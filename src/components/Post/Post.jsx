import { useState } from "react";
import { Form, Button, Spinner, Alert } from "react-bootstrap";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { useDispatch, useSelector } from "react-redux";

import styles from "./Post.module.css";
import Error from "../Error/Error";
import { fetchCreatePost } from "../../share/reducers/fetch/post";

const initialState = {
  username: "",
  email: "",
  password: "",
};
export default function Post() {
  const [value, setValue] = useState('');
  const loading = useSelector((state) => state.loader.loading);
  const postId = useSelector((state) => state.posts.id);

  const dispath = useDispatch();
  const [formData, setFormData] = useState(initialState);
  const handlerSumbit = (e) => {
    e.preventDefault();
    const tagList = formData.tagList.split(",").map((item) => item.trim());
    dispath(fetchCreatePost({ ...formData, tagList, body: value }));
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      {postId !== 0 && <Alert varaiant="success">Post created</Alert>}
      {loading && <Spinner animation="border" variant="primary" />}
      <Error />
      {!loading && (
        <div className="container">
          <Form className={styles.form} onSubmit={(e) => handlerSumbit(e)}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                placeholder="Enter title"
                onChange={(e) => changeHandler(e)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>description</Form.Label>
              <Form.Control
                name="description"
                placeholder="Enter description"
                onChange={(e) => changeHandler(e)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>TagList. Enter by comma</Form.Label>
              <Form.Control
                name="tagList"
                placeholder="Enter tagList"
                onChange={(e) => changeHandler(e)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Post body</Form.Label>
              {/* <Form.Control
                name="body"
                placeholder="Enter post body"
                as="textarea"
                rows={8}
                onChange={(e) => changeHandler(e)}
              /> */}
              <ReactQuill theme="snow" value={value} onChange={setValue} className={styles.editor}/>
            </Form.Group>

            <Button variant="primary" className="mb-3" type="submit">
              Create Post
            </Button>
          </Form>
        </div>
      )}
    </>
  );
}
