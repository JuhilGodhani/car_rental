import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import CommonSection from "../components/Ui/CommonSection";
import BlogList from "../components/Ui/BlogList";
import { dbs } from "../components/userfirebase/userfirebase";
import {
  ref,
  onValue,
  set,
  get,
  update,
  remove,
  child,
} from "firebase/database";

const Blog = () => {
  const [Blogdata, setBlogdata] = useState([]);
  useEffect(() => {
    const dbRef1 = ref(dbs, "blogs");
    onValue(dbRef1, (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapShot) => {
        let keyName = childSnapShot.key;
        let data = childSnapShot.val();
        records.push({ key: keyName, data: data });
      });
      setBlogdata(records);
    });
    localStorage.setItem("carrating", "0");
  }, []);

  return (
    <div title="Blogs">
      <CommonSection title="Blogs" />
      <section>
        <Container>
          <Row>
            {Blogdata.map((item) => (
              <BlogList item={item} key={item.key} />
            ))}
            {/* <BlogList /> */}
            {/* <BlogList /> */}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Blog;
