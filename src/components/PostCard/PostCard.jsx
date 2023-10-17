import { Link } from 'react-router-dom';
import styles from './PostCard.module.css';
import { Button } from 'react-bootstrap';
import { LiaCommentSolid } from 'react-icons/lia';
import { IoCreateOutline, IoTrashOutline } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDeletePost,
  fetchPostsByUser,
  fetchPostComments,
} from '../../share/reducers/fetch/post';
import { setPostSlug } from '../../share/reducers/postsSlice';
import { useEffect, useState } from 'react';

export default function PostCard({ post, isEdit }) {
  const [comments, setComments] = useState(0);
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);

  useEffect(() => {
    async function getComments() {
      const res = await dispatch(fetchPostComments(post.slug));

      setComments(res.payload);
    }
    getComments();
  }, [dispatch, post.slug]);

  return (
    <div className={styles.card}>
      {isEdit && (
        <div className={styles.iconsWrap}>
          <Link to='/post'>
            <IconContext.Provider
              value={{
                color: '#323673',
                className: 'create-icon',
                size: '22px',
              }}
            >
              <IoCreateOutline
                onClick={() => dispatch(setPostSlug(post.slug))}
              />
            </IconContext.Provider>
          </Link>
          <IconContext.Provider
            value={{ color: '#323673', className: 'create-icon', size: '22px' }}
          >
            <IoTrashOutline
              onClick={async () => {
                await dispatch(fetchDeletePost(post.slug));
                await dispatch(fetchPostsByUser(id));
              }}
            />
          </IconContext.Provider>
        </div>
      )}
      <h2>{post.title}</h2>
      <p>{post.description}</p>
      <div className={styles.tags}>
        {post.tagList.map((item, i) => {
          return (
            <a href={`${item}`} key={i}>
              {item}
            </a>
          );
        })}
      </div>
      <div>
        <IconContext.Provider
          value={{ color: '#323673', className: 'create-icon', size: '22px' }}
        >
          <LiaCommentSolid />
        </IconContext.Provider>
        {comments.length}
      </div>
      <Link to={`post/${post.slug}`}>
        <Button variant='primary'>See more...</Button>
      </Link>
    </div>
  );
}
