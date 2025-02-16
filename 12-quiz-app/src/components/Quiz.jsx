import {useCallback, useState} from "react";

import QUESTIONS from "../questions.js";
import completionImg from "../assets/quiz-complete.png";
import Question from "./Question.jsx";

export default function Quiz() {
  const [answers, setAnswers] = useState([]);

  const activeQuestionIdx = answers.length;
  const quizFinished = activeQuestionIdx === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selected) {
      setAnswers(prevAnswers => [...prevAnswers, selected]);
  }, []);

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizFinished) {
    const correctAnswers = answers.map(
      (answer, i) => QUESTIONS[i].answers[0] === answer
    ).filter(answer => answer === true).length;

    return (
      <div id="summary">
        <img src={completionImg} alt="Trophy icon" />
        <h2>Quiz Completed!</h2>
        <p>Correct Answers: { correctAnswers }</p>
      </div>
    );
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIdx}
        questionIdx={activeQuestionIdx}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}