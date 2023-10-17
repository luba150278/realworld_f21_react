import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';
import parse from 'html-react-parser';

import {
  fetchGetAllPosts,
  fetchAddComment,
  fetchPostComments,
} from '../../share/reducers/fetch/post';
import Error from '../Error/Error';
import styles from '../PostCard/PostCard.module.css';
import stylesInner from './SinglePost.module.css';

export default function SinglePost() {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [successAdd, setSuccessAdd] = useState(false);
  const dispatch = useDispatch();
  const { slug } = useParams();
  const post = useSelector((state) => state.posts.articles).find(
    (item) => item.slug === slug
  );
  const id = useSelector((state) => state.auth.id);
  const loading = useSelector((state) => state.loader.loading);

  useEffect(() => {
    if (!post) {
      dispatch(fetchGetAllPosts());
    }
  }, [dispatch, post, slug]);

  const handlerSumbit = async (e) => {
    e.preventDefault();
    const res = await dispatch(fetchAddComment({ slug, comment }));
    if (res.payload.id) {
      setSuccessAdd(true);
      const res = await dispatch(fetchPostComments(slug));
      setComments(res.payload);
      setComment(() => '');

      setTimeout(() => {
        setSuccessAdd(false);
      }, 3000);
    }
  };

  useEffect(() => {
    async function getCommets() {
      const res = await dispatch(fetchPostComments(slug));
      console.log(res);
      setComments(res.payload);
    }
    getCommets();
  }, [dispatch, slug]);

  return post ? (
    <div className={`${styles.card} container my-5`}>
      {loading && <Spinner animation='border' variant='primary' />}
      <Error />

      <div>
        <h2>{post.title}</h2>
        <p>{post.description}</p>
        <div>{parse(post.body)}</div>
        <div className={styles.tags}>
          {post.tagList.map((item, i) => (
            <a href={`${item}`} key={i}>
              {item}
            </a>
          ))}
        </div>
      </div>
      {comments.length !== 0 && (
        <div className={stylesInner.comments}>
          <hr />
          <h3>Comments</h3>
          {comments.map((item, i) => (
            <div
              key={item.id}
              className={`${stylesInner.comment} ${
                i === comments.length - 1 && stylesInner.last
              }`}
            >
              <div className={stylesInner.title}>
                <h6>Author: {item.author.username}</h6>
                <p>{new Date(item.updatedAt).toLocaleDateString()}</p>
              </div>
              <p>{item.body}</p>
            </div>
          ))}
          <hr />
        </div>
      )}
      {id !== 0 ? (
        <Form onSubmit={(e) => handlerSumbit(e)} className={stylesInner.form}>
          {successAdd && (
            <Alert variant='success'>Your comment was added succesfully</Alert>
          )}
          <Form.Group className='mb-3'>
            <Form.Label>Leave Your Comment</Form.Label>
            <Form.Control
              name='comment'
              placeholder='Your comment'
              onChange={(e) => setComment(e.target.value)}
              as='textarea'
              rows={5}
              value={comment}
            />
          </Form.Group>
          <Button type='submit'>Add Comment</Button>
        </Form>
      ) : (
        <p>Login and leave your comment</p>
      )}
    </div>
  ) : null;
}
