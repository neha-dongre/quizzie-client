import React, { useState, useEffect } from "react";
import styles from "./PollCompletion.module.css";

const PollCompletion = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return null; // Return null instead of the loader
  }

  return (
    <div className={styles.mainContainer}>
      {/* No Confetti here */}
      <div className={styles.thankYouContainer}>
        Thank you for participating in the Poll
      </div>
    </div>
  );
};

export default PollCompletion;
