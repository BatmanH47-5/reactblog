// BlogPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase'; // Import Firestore from your firebase.js
import '../styles/BlogPage.css'; // Your CSS file for styling

const BlogPage = () => {
  const { id } = useParams(); // Get blog ID from the URL
  const navigate = useNavigate(); // To redirect if needed
  const [blogData, setBlogData] = useState(null); // State to hold blog data

  useEffect(() => {
    // Fetch blog by ID
    const docRef = db.collection('blogs').doc(id);

    docRef.get().then((doc) => {
      if (doc.exists) {
        setBlogData(doc.data());
      } else {
        navigate('/'); // Redirect to home if blog doesn't exist
      }
    }).catch(error => console.error("Error fetching blog: ", error));
  }, [id, navigate]);

  // Function to render the blog content
  const addArticle = (data) => {
    return data.split("\n").filter(item => item.length).map((item, index) => {
      if (item.startsWith('#')) {
        let hCount = 0;
        while (item[hCount] === '#') {
          hCount++;
        }
        const Tag = `h${hCount}`; // Dynamic heading tag
        return <Tag key={index}>{item.slice(hCount).trim()}</Tag>; // Trim to remove extra spaces
      } else if (item.startsWith('![')) {
        const alt = item.match(/\[(.*?)\]/)[1]; // Get alt text
        const src = item.match(/\((.*?)\)/)[1]; // Get image source
        return <img key={index} src={src} alt={alt} className="article-image" />;
      } else {
        return <p key={index}>{item}</p>;
      }
    });
  };

  if (!blogData) return <p>Loading...</p>; // Show loading state

  return (
    <div className="blog-page">
      <div className="banner" style={{ backgroundImage: `url(${blogData.bannerImage})` }}></div>
      <div className="blog">
        <h1 className="title">{blogData.title}</h1>
        <p className="published"><span>Published at - </span>{blogData.publishedAt}</p>
        <div className="article">
          {addArticle(blogData.article)}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
