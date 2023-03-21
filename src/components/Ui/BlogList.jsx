import React, { useState, useEffect } from "react";
import { Col } from "reactstrap";
import "../../style/blog-item.css";
import { Link } from "react-router-dom";
import blogData from "../../assests/data/blogData";
import "../../style/blog-item.css";
import { dbs } from "../userfirebase/userfirebase";
import {
  ref,
  onValue,
  set,
  get,
  update,
  remove,
  child,
} from "firebase/database";

// const BlogList = (props) => {
//   const [Blogdata, setBlogdata] = useState([]);
//   console.log("props56>> ", props);
//   useEffect(() => {
//     const dbRef = ref(dbs, "blogs");
//     onValue(dbRef, (snapshot) => {
//       let records = [];
//       snapshot.forEach((childSnapShot) => {
//         let keyName = childSnapShot.key;
//         let data = childSnapShot.val();
//         records.push({ key: keyName, data: data });
//       });
//       setBlogdata(records);
//     });
//   }, []);
//   return (
//     <>
//       {Blogdata.map((item) => (
//         <BlogItem item={item} key={item.key} />
//       ))}
//     </>
//   );
// };

const BlogList = (props) => {
  const { title, author, carimg, date, description, time } = props.item.data;
  // console.log("45 :>> ", props.item.data);
  //   const { imgUrl, title, author, date, description, time } = item;
  //   return <div>juhil</div>;
  return (
    <Col lg="4" md="6" sm="6" className="mb-5">
      <div className="blog_item">
        <img src={carimg} alt="" className="w-100 img" />
        <div className="blog_info p-3">
          {/* <Link to={`/blogs/${title}`}  */}
          <div className="blog_title">
            {/* > */}
            {title}
          </div>
          {/* </Link> */}
          <p className="section_description mt-3">
            {/* {description} */}
            {description.length > 100
              ? description.substr(0, 100)
              : description}
          </p>

          {/* <Link to={`/blogs/${title}`} className='read_more'>Read More</Link> */}

          <div className="blog_time pt-3 mt-3 d-flex align-items-center justify-content-between">
            <span className="blog_author ">
              <i className="ri-user-line"></i>
              {author}
            </span>

            <div className=" d-flex align-items-center gap-3">
              <span className="d-flex align-items-center gap-1 section_description">
                <i className="ri-calendar-line calc"></i>
                {date}
              </span>

              {/* <span className=" d-flex align-items-center gap-1 section_description">
                              <i className="ri-time-line"></i>{time}
                          </span> */}
            </div>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default BlogList;
