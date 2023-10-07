import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Spinner } from "react-bootstrap";
import styles from "./App.module.css";

import axios from "axios";
import { apiUrl } from "../../share/api";
import Main from "../Main/Main";
import { selectTag } from "../../share/reducers/tagSlice";
import { fetchPostsByTag } from "../../share/reducers/fetch/post";
import Error from "../Error/Error";

function App() {
  const [tags, setTags] = useState([]);
  const loading = useSelector((state) => state.loader.loading);
  const activeTag = useSelector((state) => state.tagSelect.tag);
  const dispatch = useDispatch();
  function getPostsByTag(tag){
    dispatch(selectTag(tag));
    dispatch(fetchPostsByTag(tag))
  }
  useEffect(() => {
    async function getTags() {
      const res = await axios.get(`${apiUrl}/tags`);
      setTags(res.data.tags);
    }
    getTags();
  }, [tags]);

  return (
    <div className="container">
      {loading && <Spinner animation="border" variant="primary" />}
      <Error />
      <div className={styles.grid}>
        <Main />
        {/* <div className={styles.wrap}>
          {articles.map((item, id) => (
            <PostCard key={id} post={item} />
          ))}
        </div> */}
        <div className={styles.tags}>
          {tags.map((item, i) => (
            <Button
              variant="outline-dark"
              key={`tag-${i + 1}`}
              className={`${styles.tag} ${activeTag === item && styles.active}`}
              onClick={() => getPostsByTag(item) }
            >
              {item}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
