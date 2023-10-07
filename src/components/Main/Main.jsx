import { useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import PostCard from "../PostCard/PostCard";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGetAllPosts,
  fetchPostsByUser,
} from "../../share/reducers/fetch/post";
import styles from "./Main.module.css";
import { removeTag } from "../../share/reducers/tagSlice";

export default function Main() {
  const [key, setKey] = useState("allPosts");
  const articles = useSelector((state) => state.posts.articles);
  const { username, id } = useSelector((state) => state.auth);
  const activeTag = useSelector((state) => state.tagSelect.tag);
  const dispatch = useDispatch();

  //   useEffect(() => {
  //     dispatch(fetchGetAllPosts());
  //   }, [dispatch]);

  useEffect(() => {
    if (activeTag && activeTag !== "") {
      setKey("tagPosts");
    }
  }, [activeTag]);
  useEffect(() => {
    if (id && id !== 0) {
      dispatch(fetchPostsByUser(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (key === "allPosts") {
      dispatch(fetchGetAllPosts());
      dispatch(removeTag());
    }
  }, [dispatch, key]);
  return (
    <div>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="my-5">
        <Tab
          eventKey="allPosts"
          title="All Posts"
          //   onClick={() => dispatch(fetchGetAllPosts())}
          onClick={() => console.log("hello")}
        >
          <div className={styles.wrap}>
            {articles.map((item, id) => (
              <PostCard key={id} post={item} />
            ))}
          </div>
        </Tab>
        {username && username !== "" && (
          <Tab eventKey="userPosts" title="User Posts">
            <div className={styles.wrap}>
              {articles.map((item, id) => (
                <PostCard key={id} post={item} />
              ))}
            </div>
          </Tab>
        )}
        {activeTag && activeTag !== "" && (
          <Tab eventKey="tagPosts" title="Posts by Tag">
            <div className={styles.wrap}>
              {articles.map((item, id) => (
                <PostCard key={id} post={item} />
              ))}
            </div>
          </Tab>
        )}
      </Tabs>
    </div>
  );
}
