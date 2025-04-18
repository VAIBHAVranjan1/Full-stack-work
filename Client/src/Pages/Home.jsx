import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Home.css'
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
      try {
        const res = await axios.get("http://localhost:3000/posts");
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  
  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <img src={post.img} alt={post.title} className="post-image" />
            <div className="content">
              <Link className="linking" to={`/post/${post.id}`}>
                <h2 className="post-title">{post.title}</h2>
              </Link>
              <p className="post-description">{post.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
