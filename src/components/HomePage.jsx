// HomePage.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import '../styles/HomePage.css';

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await db.collection("blogs").get();
        const blogsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBlogs(blogsArray);
      } catch (error) {
        console.error("Error fetching blogs: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleEditorClick = () => {
    navigate('/login');
  };

  if (loading) return <div>Loading...</div>; // Show loading state

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <img src="/img/logo.png" className="logo" alt="Logo" />
        <ul className="links-container">
          <li className="link-item">
            <Link to="/" className="link">Home</Link>
          </li>
          <li className="link-item">
            <button onClick={handleEditorClick} className="link">Editor</button>
          </li>
        </ul>
      </nav>

      {/* Header Section */}
      <header className="header">
        <div className="content">
          <h1 className="heading">
            <span className="small">Welcome in the world of</span>
            blog
            <span className="no-fill">writing</span>
          </h1>
          <button onClick={handleEditorClick} className="btn">Write a blog</button>
        </div>
      </header>

      {/* Blog Section */}
      <section className="blogs-section">
        {blogs.map((blog) => (
          <div className="blog-card" key={blog.id}>
            <img src={blog.bannerImage} className="blog-image" alt="Blog" />
            <h1 className="blog-title">{blog.title.substring(0, 100)}...</h1>
            <p className="blog-overview">{blog.article.substring(0, 200)}...</p>
            <Link to={`/${blog.id}`} className="btn dark">Read</Link>
          </div>
        ))}
      </section>
    </div>
  );
};

export default HomePage;
