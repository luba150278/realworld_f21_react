import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { IoCreateOutline } from 'react-icons/io5';
import styles from './Header.module.css';
import { IconContext } from 'react-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../share/reducers/authSlice';

export default function Header() {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.username);
  const navigate = useNavigate();
  return (
    <header>
      <div className='container'>
        <div className={styles.wrap}>
          <h1>Logo</h1>
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
                {username}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
