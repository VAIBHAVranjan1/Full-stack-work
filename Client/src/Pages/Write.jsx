import React, { useContext, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./write.css";
import { userContext } from "../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Write = () => {
  const navigate = useNavigate();
  const {currentUser} = useContext(userContext);
  const [desc, setdesc] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Food");
  const [img, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  

  const handleSubmit = async() => {
    if (!title || !desc) {
      alert("Please fill in the title and description.");
      return;
    }    
    const postData = {
      title, desc, img, userId: currentUser.id
    }
    const result = await axios.post("http://localhost:3000/posts", postData, {
      withCredentials: true,
    });
    
    console.log(result);
    setTitle("");
    setdesc("");
    setCategory("Food");
    setImage(null);
    navigate("/");
  }

  return (
    <div className="write-container">
      <div className="editor-section">
        <input
          type="text"
          placeholder="Title"
          className="title-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <ReactQuill className="quill-editor" value={desc} onChange={setdesc} />
      </div>

      <div className="sidebar">
        <div className="publish">

          <p><strong>Visibility:</strong> Public</p>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {img && <img src={img} alt="Uploaded Preview" className="preview-img" />}
          <button className="draft-btn">Save as a draft</button>
          <button className="update-btn" onClick={handleSubmit}>Update</button>
        </div>

        <div className="category">
          <h3>Category</h3>
          {["Art", "Science", "Technology", "Cinema", "Design", "Food", "Porn"].map((cat) => (
            <label key={cat}>
              <input
                type="radio"
                name="category"
                value={cat}
                checked={category === cat}
                onChange={() => setCategory(cat)}
              />
              {cat}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Write;
