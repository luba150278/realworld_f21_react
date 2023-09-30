import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGetAllPosts } from '../../share/reducers/postsSlice';
import { Spinner } from 'react-bootstrap';
import styles from './App.module.css';

function App() {
  const articles = useSelector((state) => state.posts.articles);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.posts.loading);

  useEffect(() => {
    dispatch(fetchGetAllPosts());
  }, [dispatch]);

  return (
    <div className='container'>
      {loading && <Spinner animation='border' variant='primary' />}
      <div className={styles.wrap}>
        {articles.map((item, id) => (
          <p key={id}>{item.title}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
