import React, { useState } from 'react';
import axios from 'axios';
import styles from '../Styles/Customer/Feedback.module.css';

const Feedback = ({ orderId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/orders/${orderId}/feedback`, {
        rating,
        comment
      });
      setRating(0);
      setComment('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Leave Feedback</h2>
      {error && <p className={styles.error}>{error}</p>}
      <label>
        Rating:
        <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} min="1" max="5" />
      </label>
      <label>
        Comment:
        <textarea value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Feedback;
