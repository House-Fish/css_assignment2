/* Tevel's Code */

"use client";

import React, { useState, useEffect } from 'react';
import styles from './page.module.css'; // Import the CSS module
import Image from 'next/image';

// Define ForumPage component
const ForumPage = () => {
  // State variables to manage comments and replies
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [replyText, setReplyText] = useState('');
  const [replyIndex, setReplyIndex] = useState(null);
  const [parentCommentIndex, setParentCommentIndex] = useState(null); // Track parent comment index for replies

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

  // Event handler for adding a reply to a comment
  const handleAddReply = () => {
    if (replyText.trim() !== '' && replyIndex !== null) {
      const updatedComments = [...comments];
      updatedComments[parentCommentIndex].replies.push({ text: replyText, user: 'You', likes: 0, dislikes: 0, replies: [] });
      setComments(updatedComments);
      localStorage.setItem('comments', JSON.stringify(updatedComments));
      setReplyText('');
      setReplyIndex(null); // Clear the reply index after replying
      setParentCommentIndex(null); // Clear the parent comment index after replying
    }
  };

  // Event handler for initiating a reply to a comment
  const handleReply = (index) => {
    setReplyIndex(index);
    setParentCommentIndex(index); // Set the parent comment index for the replied comment
  };

  // Event handler for liking or disliking a comment or reply
  const handleReaction = (commentIndex, replyIndex, reactionType) => {
    const updatedComments = [...comments];
    if (replyIndex !== undefined) {
      updatedComments[commentIndex].replies[replyIndex][reactionType] += 1;
    } else {
      updatedComments[commentIndex][reactionType] += 1;
    }
    setComments(updatedComments);
    localStorage.setItem('comments', JSON.stringify(updatedComments));
  };

  // Event handler for clearing localStorage
  const clearLocalStorage = () => {
    localStorage.removeItem('comments');
    setComments([]); // Clear the comments in the state as well
    setReplyIndex(null); // Clear reply index
    setParentCommentIndex(null); // Clear parent comment index
  };

  return (
    <div className={styles.websiteContainer}>
      <div className={styles.forumPage}>
        <h1>Flappy's Forum!</h1>

        {/* Floating bird */}
        <div className={`${styles.bird} ${styles.birdfloating}`}>
          <Image
            src="/bird.png"
            alt="Bird Logo"
            width={150}
            height={100}
          />
        </div>

        {/* Comment input and buttons */}
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

        {/* Display comments and replies */}
        <div className={styles.comments}>
          {comments.map((comment, index) => (
            <div key={index} className={styles.comment}>
              <div className={styles.commentHeader}>
                <div className={styles.commentUser}>{comment.user}:</div>
                <div className={styles.commentText}>{comment.text}</div>
              </div>
              <div className={styles.likeDislikeButtons}>
                <button className={`${styles.likeButton} ${styles.actionButton}`} onClick={() => handleReaction(index, undefined, 'likes')}>
                  Like
                </button>
                <span>{comment.likes}</span>
                <button className={`${styles.dislikeButton} ${styles.actionButton}`} onClick={() => handleReaction(index, undefined, 'dislikes')}>
                  Dislike
                </button>
                <span>{comment.dislikes}</span>
              </div>
              <button className={styles.replyButton} onClick={() => handleReply(index)}>
                Reply to comment
              </button>
              {replyIndex === index && (
                <div className={styles.replyContainer}>
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
                    <div key={replyIndex} className={`${styles.reply} ${replyIndex !== 0 ? styles['replied-reply'] : ''}`}>
                      <div className={styles.commentHeader}>
                        <div className={styles.commentUser}>{reply.user}:</div>
                        <div className={styles.commentText}>{reply.text}</div>
                      </div>
                      <div className={styles.likeDislikeButtons}>
                        <button className={`${styles.likeButton} ${styles.actionButton}`} onClick={() => handleReaction(index, replyIndex, 'likes')}>
                          Like
                        </button>
                        <span>{reply.likes}</span>
                        <button className={`${styles.dislikeButton} ${styles.actionButton}`} onClick={() => handleReaction(index, replyIndex, 'dislikes')}>
                          Dislike
                        </button>
                        <span>{reply.dislikes}</span>
                      </div>
                      <button className={styles.replyButton} onClick={() => handleReply(index)}>
                        Reply to reply
                      </button>
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

