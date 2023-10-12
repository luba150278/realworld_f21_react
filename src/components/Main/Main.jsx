import { useEffect, useState } from "react";
import { Button, Pagination } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchGetAllPosts,
  fetchPostsByUser,
} from "../../share/reducers/fetch/post";
import styles from "./Main.module.css";
import { removeTag } from "../../share/reducers/tagSlice";
import Posts from "../Posts/Posts";
import { changePagination } from "../../share/reducers/postsSlice";

export default function Main() {
  const [active, setActivePage] = useState(1);
  const [items, setItems] = useState([]);
  const activeTag = useSelector((state) => state.tagSelect.tag);
  const [variant, setBtn] = useState(1);
  const { id } = useSelector((state) => state.auth);
  const limit = useSelector((state) => state.posts.limit);
  const articlesCount = useSelector((state) => state.posts.articlesCount);
  const dispatch = useDispatch();

  useEffect(() => {
    const arr = [];
    for (let number = 1; number <= Math.ceil(articlesCount / limit); number++) {
      arr.push(number);
    }
    setItems(arr);
  }, [articlesCount, limit]);
  useEffect(() => {
    if (activeTag !== "") {
      setBtn(3);
    }
  }, [activeTag]);

  return (
    <div>
      <div className={styles.btns}>
        <Button
          onClick={() => {
            dispatch(fetchGetAllPosts());
            dispatch(removeTag());
            setBtn(1);
          }}
          className={variant === 1 && styles.active}
        >
          All Posts
        </Button>
        {id !== 0 && (
          <Button
            onClick={() => {
              dispatch(fetchPostsByUser(id));
              setBtn(2);
              dispatch(removeTag());
            }}
            className={variant === 2 && styles.active}
          >
            User Posts
          </Button>
        )}
        {activeTag !== "" && (
          <Button
            onClick={() => {
              setBtn(3);
            }}
            className={variant === 3 && styles.active}
          >
            Tag Posts
          </Button>
        )}
      </div>
      <Posts variant={variant} id={id} activeTag={activeTag} />
      {articlesCount > limit && (
        <Pagination>
          {items.map((item) => (
            <Pagination.Item
              key={item}
              active={item === active}
              onClick={() => {
                setActivePage(item);
                dispatch(changePagination(item));
              }}
            >
              {item}
            </Pagination.Item>
          ))}
        </Pagination>
      )}
    </div>
  );
}
