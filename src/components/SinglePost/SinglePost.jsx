import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from '../PostCard/PostCard.module.css';
import parse from "html-react-parser";


export default function SinglePost() {
  const { slug } = useParams();
  const post = useSelector((state) => state.posts.articles).find(
    (item) => item.slug === slug
  );

  return post ? (
    <div className={`${styles.card} container my-5`}>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
      <p>{parse(post.body)}</p>
      <div className={styles.tags}>
        {post.tagList.map((item, i) => (
          <a href={`${item}`} key={i}>
            {item}
          </a>
        ))}
      </div>
    </div>
  ) : null;
}
