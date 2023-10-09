import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGetAllPosts
} from "../../share/reducers/fetch/post";

import PostCard from "../PostCard/PostCard";
import styles from "./Posts.module.css";

export default function Posts() {
  const articles = useSelector((state) => state.posts.articles);
  const offset = useSelector((state)=>state.posts.offset)
  const dispatch = useDispatch();
  useEffect(() => {dispatch(fetchGetAllPosts());}, [dispatch, offset])

  return (
    <div className={styles.wrap}>
      {articles.map((item, id) => (
        <PostCard key={id} post={item} />
      ))}
    </div>
  );
}
