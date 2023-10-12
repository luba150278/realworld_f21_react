import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { IoCreateOutline } from 'react-icons/io5';

import { IconContext } from 'react-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../share/reducers/authSlice';
import styles from './Header.module.css';

export default function Header() {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.username);
  const navigate = useNavigate();
  return (
    <header>
      <div className='container'>
        <div className={styles.wrap}>
          <h1 className={styles.h1}><Link to="/">Logo</Link></h1>
          <div>
            {!username ? (
              <Link to='/auth'>
                <IconContext.Provider
                  value={{ color: 'white', className: 'login-icon' }}
                >
                  <FiLogIn />
                </IconContext.Provider>
              </Link>
            ) : (
              <div className={styles.userData}>
                <Link to='/post'>
                  <IconContext.Provider
                    value={{ color: 'white', className: 'create-icon' }}
                  >
                    <IoCreateOutline />
                  </IconContext.Provider>
                </Link>

                <IconContext.Provider
                  value={{ color: 'white', className: 'login-icon' }}
                >
                  <FiLogOut
                    onClick={() => {
                      dispatch(logout());
                      navigate('/');
                    }}
                  />
                </IconContext.Provider>
                <Link to="/user" className={styles.userName}>{username}</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
