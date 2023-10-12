import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetAllPosts, fetchPostsByUser, fetchPostsByTag } from "../../share/reducers/fetch/post";

import PostCard from "../PostCard/PostCard";
import styles from "./Posts.module.css";
import { changePagination } from "../../share/reducers/postsSlice";

export default function Posts({ variant, isChangePag }) {
  const articles = useSelector((state) => state.posts.articles);
  const offset = useSelector((state) => state.posts.offset);
  const { id } = useSelector((state) => state.auth);
  const activeTag = useSelector((state) => state.tagSelect.tag);
  const articlesCount = useSelector((state) => state.posts.articlesCount);
  const limit = useSelector((state) => state.posts.limit);

  const dispatch = useDispatch();
  useEffect(() => {
    if (variant === 1) {
      dispatch(fetchGetAllPosts());
    }
    if(variant === 2){
      dispatch(fetchPostsByUser(id))
    }
    if(variant === 3){
      dispatch(fetchPostsByTag(activeTag))
    }
  }, [dispatch, offset, id, variant, activeTag]);

  useEffect(()=>{
    if(articlesCount<=limit || articles.length === 0){
      dispatch(changePagination(1));
      isChangePag(true);
    }
  }, [articlesCount, limit, dispatch, articles.length, isChangePag])

  return (
    <div className={styles.wrap}>
      {articles.map((item, id) => (
        <PostCard key={id} post={item} isEdit={variant===2} />
      ))}
    </div>
  );
}
