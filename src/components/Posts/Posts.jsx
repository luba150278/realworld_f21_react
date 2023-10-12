import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetAllPosts, fetchPostsByTag, fetchPostsByUser } from '../../share/reducers/fetch/post';
import { changePagination } from '../../share/reducers/postsSlice';

import PostCard from '../PostCard/PostCard';
import styles from './Posts.module.css';

export default function Posts({ variant, id, activeTag }) {
  const articles = useSelector((state) => state.posts.articles);
  const articlesCount = useSelector((state) => state.posts.articlesCount);
  const { offset, limit } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    if (variant === 1) {
      dispatch(fetchGetAllPosts());
    }

    if (variant === 2) {
      dispatch(fetchPostsByUser(id));
    }

    if (variant === 3) {
      dispatch(fetchPostsByTag(activeTag));
    }
  }, [dispatch, offset, variant, id, activeTag]);

  useEffect(() => {
    if (articlesCount <= limit) {
      dispatch(changePagination(1))
    }
  }, [articlesCount, dispatch, limit])

  return (
    <div className={styles.wrap}>
      {articles.map((item, id) => (
        <PostCard key={id} post={item} />
      ))}
    </div>
  );
}
