import { useEffect, useState } from "react";
import "./menu.css";
import {Link} from 'react-router-dom'
import axios from "axios";

const Menu = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            const rec = await axios.get("http://localhost:3000/posts");
            setPosts(rec.data);
        }
        fetchData();
    }, [])

    
    
    return (
        <div className="menu" >
            <h2>Other Posts You May Like</h2>
            {posts.map(post => (
                <div className="post" key={post.id}>
                    <img src={post.img} alt={post.title} />
                    <div className="post-content">
                        <Link className="linking" to={`/post/${post.id}`}>
                            <h3>{post.title}</h3>
                        </Link>
                        <p>{post.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Menu;
