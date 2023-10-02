import { Link } from "react-router-dom";
import styles from './PostCard.module.css'
import { Button } from "react-bootstrap";

export default function PostCard({ post }) {

  return (
    <div className={styles.card}>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
      {/* <p>{post.body}</p> */}
      <div className={styles.tags}>
        {post.tagList.map((item, i) => {
          return (
            <a href={`${item}`} key={i}>
              {item}
            </a>
          );
        })}
      </div>
      <Link to={`post/${post.slug}`}><Button variant="primary">See more...</Button></Link>
    </div>
  );
}
