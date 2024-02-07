'use client';

import React, { useState, useEffect } from 'react';
import styles from './page.module.css'; // Import the CSS module
import Image from 'next/image';

const ForumPage = () => {
  // State variables to manage comments and replies
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [replyText, setReplyText] = useState('');
  const [replyIndex, setReplyIndex] = useState(null);

  // Load comments from localStorage on component mount
  useEffect(() => {
    const storedComments = localStorage.getItem('comments');
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, []);

  // Event handler for comment input change
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  // Event handler for reply text input change
  const handleReplyTextChange = (e) => {
    setReplyText(e.target.value);
  };

  // Event handler for adding a new comment
  const handleAddComment = () => {
    if (comment.trim() !== '') {
      const newComments = [...comments, { text: comment, user: 'You', likes: 0, dislikes: 0, replies: [] }];
      setComments(newComments);
      localStorage.setItem('comments', JSON.stringify(newComments));
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
      const updatedComments = [...comments];
      const replyDepth = updatedComments[replyIndex].replies.length;
      updatedComments[replyIndex].replies.push({ text: replyText, user: 'You', likes: 0, dislikes: 0 });
      setComments(updatedComments);
      localStorage.setItem('comments', JSON.stringify(updatedComments));
      setReplyText('');
      setReplyIndex(null); // Clear the reply index after replying
    }
  };

  // Event handler for liking a comment or reply
  const handleLike = (commentIndex, replyIndex) => {
    const updatedComments = [...comments];
    if (replyIndex !== undefined) {
      updatedComments[commentIndex].replies[replyIndex].likes += 1;
    } else {
      updatedComments[commentIndex].likes += 1;
    }
    setComments(updatedComments);
    localStorage.setItem('comments', JSON.stringify(updatedComments));
  };

  // Event handler for disliking a comment or reply
  const handleDislike = (commentIndex, replyIndex) => {
    const updatedComments = [...comments];
    if (replyIndex !== undefined) {
      updatedComments[commentIndex].replies[replyIndex].dislikes += 1;
    } else {
      updatedComments[commentIndex].dislikes += 1;
    }
    setComments(updatedComments);
    localStorage.setItem('comments', JSON.stringify(updatedComments));
  };

  // Event handler for clearing localStorage
  const clearLocalStorage = () => {
    localStorage.removeItem('comments');
    setComments([]); // Clear the comments in the state as well
  };

  return (
    <div className={styles.websiteContainer}>
      <div className={styles.forumPage}>
        <h1>Forum!</h1>
  
        {/* Floating bird */}
        <div className={`${styles.bird} ${styles.birdfloating}`}>
          <Image
            src="/bird.png"
            alt="Bird Logo"
            width={150}
            height={100}
          />
        </div>
  
        <div className={styles.commentContainer}>
          <textarea
            className={styles.textareaContainer}
            placeholder="Write your comment..."
            value={comment}
            onChange={handleCommentChange}
          ></textarea>
          <button className={styles.commentButton} onClick={handleAddComment}>
            Comment
          </button>
          <button className={styles.clearButton} onClick={clearLocalStorage}>
            Clear Comments
          </button>
        </div>
  
        <div className={styles.comments}>
          {comments.map((comment, index) => (
            <div key={index} className={styles.comment}>
              <div className={styles.commentHeader}>
                <div className={styles.commentUser}>{comment.user}:</div>
                <div className={styles.commentText}>{comment.text}</div>
              </div>
              <div className={styles.likeDislikeButtons}>
                <button className={`${styles.likeButton} ${styles.actionButton}`} onClick={() => handleLike(index)}>
                  Like
                </button>
                <span>{comment.likes}</span>
                <button className={`${styles.dislikeButton} ${styles.actionButton}`} onClick={() => handleDislike(index)}>
                  Dislike
                </button>
                <span>{comment.dislikes}</span>
              </div>
              <button className={styles.replyButton} onClick={() => handleReply(index)}>
                Reply to comment
              </button>
              {replyIndex === index && (
                <div className={styles.replyContainer} style={{ marginLeft: `${comment.replies.length * 2}em` }}>
                  <textarea
                    className={styles.replyTextarea}
                    placeholder="Write your reply..."
                    value={replyText}
                    onChange={handleReplyTextChange}
                  ></textarea>
                  <button className={styles.replyButton} onClick={handleAddReply}>
                    Reply
                  </button>
                </div>
              )}
              <div className={styles.replies}>
                {comment.replies &&
                  comment.replies.map((reply, replyIndex) => (
                    <div key={replyIndex} className={styles.reply}>
                      <div className={styles.commentHeader}>
                        <div className={styles.commentUser}>{reply.user}:</div>
                        <div className={styles.commentText}>{reply.text}</div>
                      </div>
                      <div className={styles.likeDislikeButtons}>
                        <button className={`${styles.likeButton} ${styles.actionButton}`} onClick={() => handleLike(index, replyIndex)}>
                          Like
                        </button>
                        <span>{reply.likes}</span>
                        <button className={`${styles.dislikeButton} ${styles.actionButton}`} onClick={() => handleDislike(index, replyIndex)}>
                          Dislike
                        </button>
                        <span>{reply.dislikes}</span>
                      </div>
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

