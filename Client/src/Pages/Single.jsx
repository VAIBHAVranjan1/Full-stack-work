import "./single.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Menu from "../Components/Menu";
import moment from "moment";
import axios from "axios";

const Single = () => {
    const location = useLocation();
    const [post, setPost] = useState({});
    const navigate = useNavigate();


    const postId = location.pathname.split("/")[2];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/posts/${postId}`);
                console.log(res.data);
                setPost(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [postId]);

    const handleDelete = async () => {
      try {
        await axios.delete(`http://localhost:3000/posts/${postId}`, {
          withCredentials: true,
        });
        navigate("/");
      } catch (error) {
        alert("Failed to delete post");
      }
    };
    

    const canEdit = true;
    return (
        <div className="single-page">
          <div className="single-container">
            {!post || !post.title ? (
              <p>Loading...</p>
            ) : (
              <>
                <h1 className="title">{post.title}</h1>
      
                <img
                  src={post.img || "https://via.placeholder.com/600x300?text=No+Image"}
                  alt="Blog"
                  className="blog-image"
                />
      
                <div className="meta">
                  <span className="user">By {post.user_name || "Unknown"}</span>
                  <span className="date">
                    Posted {moment(post.date).fromNow()} ago
                  </span>
                </div>
      
                <p className="content">{post.desc || "No description found."}</p>
      
                {canEdit && (
                  <div className="post-actions">
                    <button className="edit-button">Edit</button>
                    <button className="delete-button" onClick={handleDelete}>Delete</button>
                  </div>
                )}
              </>
            )}
          </div>
      
          <div className="sidebar">
            <Menu />
          </div>
        </div>
      );
      
};

export default Single;
