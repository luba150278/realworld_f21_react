import { useState } from 'react';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin } from '../../share/reducers/authSlice';

import styles from './Login.module.css';

const initialState = {
  email: '',
  password: '',
};
export default function Login() {

  const { loading, error } = useSelector((state) => state.auth);
  const dispath = useDispatch();
  const [formData, setFormData] = useState(initialState);
  const handlerSumbit = (e) => {
    e.preventDefault();
    dispath(fetchLogin(formData));
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  return (
    <>
      {loading && <Spinner animation='border' variant='primary' />}
      {error.body && (
        <div>
          {error.body.map((item) => (
            <Alert key={item} variant='danger'>
              {item}
            </Alert>
          ))}
        </div>
      )}
      {error.message && <Alert variant='danger'>{error.mesaage}</Alert>}
      {!loading && (
        <Form className={styles.form} onSubmit={(e) => handlerSumbit(e)}>

          <Form.Group className='mb-3'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              name='email'
              placeholder='name@example.com'
              onChange={(e) => changeHandler(e)}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              name='password'
              onChange={(e) => changeHandler(e)}
            />
          </Form.Group>

          <Button variant='primary' className='mb-3' type='submit'>
            Login
          </Button>
        </Form>
      )}
    </>
  );
}
