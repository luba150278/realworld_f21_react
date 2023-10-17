import { Form, Button, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import {
  fetchCurrentUser,
  fetchEditUser,
} from '../../share/reducers/fetch/auth';
import Error from '../Error/Error';

const initialState = {
  email: '',
  username: '',
  bio: '',
  image: '',
};
export default function EditUser() {
  const loading = useSelector((state) => state.loader.loading);
  const username = useSelector((state) => state.auth.username);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(initialState);
  const handlerSumbit = async (e) => {
    e.preventDefault();
    await dispatch(fetchEditUser(formData));
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    async function getCurrentUser() {
      const res = await dispatch(fetchCurrentUser());
      const { email, username, bio, image } = res.payload;
      setFormData({ email, username, bio, image });
    }
    getCurrentUser();
  }, [dispatch]);

  return (
    <div className='container'>
      {loading && <Spinner animation='border' variant='primary' />}
      <Error />
      <h1>Edit User - {username}</h1>
      <Form onSubmit={(e) => handlerSumbit(e)}>
        <Form.Group className='mb-3'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            name='email'
            placeholder='name@example.com'
            onChange={(e) => changeHandler(e)}
            value={formData.email}
            disabled={true}
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            name='username'
            placeholder='username'
            onChange={(e) => changeHandler(e)}
            value={formData.username}
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Bio</Form.Label>
          <Form.Control
            name='bio'
            placeholder='bio'
            onChange={(e) => changeHandler(e)}
            value={formData.bio}
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>User Photo</Form.Label>
          <Form.Control
            name='image'
            placeholder='image'
            onChange={(e) => changeHandler(e)}
            // value={formData.image}
            type='file'
          />
        </Form.Group>

        <Button variant='primary' className='mb-3' type='submit'>
          Edit User Data
        </Button>
      </Form>
    </div>
  );
}
