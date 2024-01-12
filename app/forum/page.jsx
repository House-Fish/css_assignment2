// ForumPage.jsx
'use client';

import styles from './page.module.css'; // Import the CSS module
import React, { useState, useEffect } from 'react';

const ForumPage = () => {
  // State hooks
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [replyText, setReplyText] = useState('');
  const [replyIndex, setReplyIndex] = useState(null);

  useEffect(() => {
    // Load comments from localStorage 
    const storedComments = localStorage.getItem('comments');
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, []);

  // Event handler for changing the main comment input
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  // Event handler for changing the reply input
  const handleReplyTextChange = (e) => {
    setReplyText(e.target.value);
  };


  // Event handler for adding a new comment
  const handleAddComment = () => {
    if (comment.trim() !== '') {

       // Create a new comment object and update the state
      const newComments = [...comments, { text: comment, user: 'You', replies: [] }];
      setComments(newComments);

      // Save the comments to localStorage
      localStorage.setItem('comments', JSON.stringify(newComments));

      // Clear the comment input
      setComment('');
    }
  };

  // Event handler for initiating a reply to a comment
  const handleReply = (index) => {
    setReplyIndex(index);
  };

   // Event handler for adding a reply to a comment
  const handleAddReply = () => {
    if (replyText.trim() !== '' && replyIndex !== null) {

      // Update the comments array with the new reply
      const updatedComments = [...comments];
      updatedComments[replyIndex].replies.push({ text: replyText, user: 'You' });
      setComments(updatedComments);

      // Save the updated comments to localStorage
      localStorage.setItem('comments', JSON.stringify(updatedComments));

      // Clear the reply input and reset the reply index
      setReplyText('');
      setReplyIndex(null);
    }
  };

  return (
    <div className={styles.websiteContainer}>
      <div className={styles.forumPage}>
      <h1>Forum!</h1>

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
        {comments.map((comment, index) => (
          <div key={index} className={styles.comment}>
            <div>{`${comment.user}: ${comment.text}`}</div>
            <button onClick={() => handleReply(index)}>Reply to comment</button>
            {replyIndex === index && (
              <div>
                <textarea
                  placeholder="Write your reply..."
                  value={replyText}
                  onChange={handleReplyTextChange}
                ></textarea>
                <button onClick={handleAddReply}>Reply</button>
              </div>
            )}
            <div className={styles.replies}>
              {comment.replies && comment.replies.map((reply, replyIndex) => (
                <div key={replyIndex} className={styles.reply}>
                  {`${reply.user}: ${reply.text}`}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default ForumPage;