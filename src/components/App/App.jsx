import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Spinner } from 'react-bootstrap';
import styles from './App.module.css';
import { fetchGetAllPosts } from '../../share/reducers/fetch/post';
import PostCard from '../PostCard/PostCard';

function App() {
  const articles = useSelector((state) => state.posts.articles);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loader.loading);

  useEffect(() => {
    dispatch(fetchGetAllPosts());
  }, [dispatch]);

  return (
    <div className='container'>
      {loading && <Spinner animation='border' variant='primary' />}
      <div className={styles.wrap}>
        {articles.map((item, id) => (
          <PostCard key ={id} post={item} />
        ))}
      </div>
    </div>
  );
}

export default App;
