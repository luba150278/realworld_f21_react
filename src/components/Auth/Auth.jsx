import { Tabs, Tab } from 'react-bootstrap';
//import styles from './Auth.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Register from '../Register/Register';
import Login from '../Login/Login';

export default function Auth() {
  const navigate = useNavigate();
  const { username } = useSelector((state) => state.auth);
  useEffect(() => {
    if (username !== '') {
      navigate('/')
    }
  }, [navigate, username])
  return (
    <div className='container'>
      <Tabs defaultActiveKey='login' className='my-5'>
        <Tab eventKey='login' title='Login'>
          <Login />
        </Tab>
        <Tab eventKey='reg' title='Register'>
          <Register />
        </Tab>
      </Tabs>
    </div>
  );
}
