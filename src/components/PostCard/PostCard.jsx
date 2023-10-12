import { Link } from "react-router-dom";
import styles from "./PostCard.module.css";
import { Button } from "react-bootstrap";
import { IoCreateOutline, IoTrashOutline } from "react-icons/io5";
import { IconContext } from "react-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDeletePost,
  fetchPostsByUser,
} from "../../share/reducers/fetch/post";
import { setPostSlug } from "../../share/reducers/postsSlice";
// import { useEffect } from "react";

export default function PostCard({ post, isEdit }) {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  // const articlesCount = useSelector((state) => state.posts.articlesCount);
  // useEffect(()=>{dispatch(fetchPostsByUser(id))}, [dispatch, id])
  return (
    <div className={styles.card}>
      {isEdit && (
        <div className={styles.iconsWrap}>
          <Link to="/post">
            <IconContext.Provider
              value={{
                color: "#323673",
                className: "create-icon",
                size: "22px",
              }}
            >
              <IoCreateOutline onClick={()=>dispatch(setPostSlug(post.slug))}/>
            </IconContext.Provider>
          </Link>
          <IconContext.Provider
            value={{ color: "#323673", className: "create-icon", size: "22px" }}
          >
            <IoTrashOutline
              onClick={async () => {
                // dispatch(fetchDeletePost(post.slug))
                //   .then(() => {
                //     dispatch(fetchPostsByUser(id));
                //   })
                //   .catch((error) => {
                //     console.error("Error deleting post:", error);
                //   });
                await dispatch(fetchDeletePost(post.slug));
                await dispatch(fetchPostsByUser(id));
              }}
            />
          </IconContext.Provider>
        </div>
      )}
      <h2>{post.title}</h2>
      <p>{post.description}</p>
      {/* <p>{parse(post.body)}</p> */}
      <div className={styles.tags}>
        {post.tagList.map((item, i) => {
          return (
            <a href={`${item}`} key={i}>
              {item}
            </a>
          );
        })}
      </div>
      <Link to={`post/${post.slug}`}>
        <Button variant="primary">See more...</Button>
      </Link>
    </div>
  );
}
