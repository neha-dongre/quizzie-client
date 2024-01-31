import React from "react";
import ImpressionsIcon from "../../assets/impressions.svg";
import styles from "./TrendingQuizs.module.css";

const TrendingQuizs = ({ quizName, impressions, creationDate }) => {
  return (
    <div className={styles.trendingQuizCard}>
      <div className={styles.quizDetails}>
        <div className={styles.quizName}>{quizName}</div>
        <div className={styles.impressions}>
          <img src={ImpressionsIcon} alt="Impressions" />
          {impressions}
        </div>
      </div>
      <div className={styles.creationDate}>Created on: {creationDate}</div>
    </div>
  );
};

export default TrendingQuizs;
