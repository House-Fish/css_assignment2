// ForumPage.jsx
'use client';

import '../globals.css';
import styles from './page.module.css'; // Import the CSS module
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const ForumPage = () => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleAddComment = () => {
    if (comment.trim() !== '') {
      setComments([...comments, comment]);
      setComment('');
    }
  };

  return (
    <div className={styles.forumPage}>
      <h1>Flappy Bird Forum!</h1>

      <div className={styles.commentContainer}>
        <textarea
          className={styles.textareaContainer}
          placeholder="Write your comment..."
          value={comment}
          onChange={handleCommentChange}
        ></textarea>
        <button onClick={handleAddComment}>Comment</button>
      </div>

      <div className={styles.comments}>
        {comments.map((c, index) => (
          <div key={index} className={styles.comment}>
            {c}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForumPage;
