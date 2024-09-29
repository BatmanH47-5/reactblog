import React, { useState } from 'react';
import { db } from '../firebase'; // Import Firestore configuration
import '../styles/EditorPage.css';

const EditorPage = () => {
  const [blogTitle, setBlogTitle] = useState('');
  const [articleContent, setArticleContent] = useState('');
  const [bannerImage, setBannerImage] = useState(null);
  const [bannerPath, setBannerPath] = useState('');
  const [months] = useState(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]);

  // Upload image function (works for both banner and content images)
  const uploadImage = (file, uploadType) => {
    if (file && file.type.includes("image")) {
      const formData = new FormData();
      formData.append('image', file);

      fetch('/upload', {
        method: 'POST',
        body: formData,
      })
        .then(res => res.json())
        .then(data => {
          if (uploadType === "banner") {
            const bannerImagePath = `${window.location.origin}/${data}`;
            setBannerPath(bannerImagePath);
            setBannerImage(bannerImagePath);
          } else {
            const imageInsert = `![${file.name}](${data})`; // Corrected image markdown syntax
            insertImageIntoArticle(imageInsert);
          }
        })
        .catch(err => console.error(err));
    } else {
      alert("Please upload an image file only.");
    }
  };

  // Insert image at cursor position in the article
  const insertImageIntoArticle = (imageInsert) => {
    const cursorPos = document.querySelector('.article').selectionStart;
    const content = articleContent.slice(0, cursorPos) + imageInsert + articleContent.slice(cursorPos);
    setArticleContent(content);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!blogTitle || !articleContent) {
      alert("Please fill in all fields.");
      return;
    }

    const date = new Date();
    const publishedAt = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

    // Upload the blog post to Firestore
    await db.collection('blogs').add({
      title: blogTitle,
      article: articleContent,
      bannerImage: bannerPath,
      publishedAt,
    });

    setBlogTitle('');
    setArticleContent('');
    setBannerImage(null);
    setBannerPath('');
    alert("Blog post created successfully!");
  };

  return (
    <div className="editor-page">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Blog Title"
          value={blogTitle}
          onChange={(e) => setBlogTitle(e.target.value)}
          required
        />
        <textarea
          className="article"
          value={articleContent}
          onChange={(e) => setArticleContent(e.target.value)}
          placeholder="Write your article here..."
          required
        />
        <input type="file" onChange={(e) => uploadImage(e.target.files[0], "banner")} />
        <input type="file" onChange={(e) => uploadImage(e.target.files[0], "content")} />
        <button type="submit">Create Blog Post</button>
      </form>
    </div>
  );
};

export default EditorPage;
