import {useCallback, useState} from "react";

import QUESTIONS from "../questions.js";
import completionImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";
import Question from "./Question.jsx";

export default function Quiz() {
  const [answerState, setAnswerState] = useState('');
  const [answers, setAnswers] = useState([]);

  const activeQuestionIdx = answerState === '' ? answers.length : answers.length - 1;
  const quizFinished = activeQuestionIdx === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selected) {
      setAnswerState('answered');

      setAnswers(prevAnswers => [...prevAnswers, selected]);

      setTimeout(() => {
        if (selected === QUESTIONS[activeQuestionIdx].answers[0]) {
          setAnswerState('correct');
        } else {
          setAnswerState('wrong');
        }

        setTimeout(() => {
          setAnswerState('');
        }, 2000);
      }, 1000);
  }, [activeQuestionIdx]);

  const handleSkipAnswer = useCallback(() =>
    handleSelectAnswer(null), [handleSelectAnswer]);

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
        questionText={QUESTIONS[activeQuestionIdx].text}
        answers={QUESTIONS[activeQuestionIdx].answers}
        answerState={answerState}
        selectedAnswer={answers[answers.length - 1]}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}