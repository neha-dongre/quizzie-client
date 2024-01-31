import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./QuizAnalysis.module.css";

const LoadingState = () => (
  <div className={styles.loaderContainer}>
    {/* You can customize the loading state as needed */}
    <div>Loading...</div>
  </div>
);

const QuestionAnalysis = ({ question, totalAttempts, correctAttempts, index }) => {
  const incorrectAttempts = totalAttempts - correctAttempts;

  return (
    <div className={styles.questionAnalysisContainer}>
      <div className={styles.question}>
        Q.{index + 1} {question}
      </div>
      <div className={styles.boxes}>
        <div className={styles.totalAttemptsBox}>
          <div>{totalAttempts}</div>People Attempted the Question
        </div>
        <div className={styles.correctAttemptsBox}>
          <div>{correctAttempts}</div>People Attempted Correctly
        </div>
        <div className={styles.incorrectAttemptsBox}>
          <div>{incorrectAttempts}</div>People Attempted Incorrectly
        </div>
      </div>
    </div>
  );
};

const QuizAnalysis = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/quiz/${quizId}`)
      .then((response) => {
        setQuiz(response.data);
      })
      .catch((error) => {
        console.error("Error fetching quiz:", error);
        setError("Error fetching quiz. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, [quizId]);

  if (loading || !quiz) {
    return <LoadingState />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>{quiz.quizName} Question Analysis</div>
      {quiz.questions.map((question, index) => (
        <QuestionAnalysis
          key={index}
          question={question.pollQuestion}
          totalAttempts={Math.round(quiz.impressions / 2)}
          correctAttempts={quiz.correctAnswers?.[index] || 0}
          index={index}
        />
      ))}
    </div>
  );
};

export default QuizAnalysis;

