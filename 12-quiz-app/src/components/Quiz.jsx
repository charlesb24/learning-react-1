import {useCallback, useState} from "react";

import QUESTIONS from "../questions.js";
import completionImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz() {
  const [answers, setAnswers] = useState([]);

  const activeQuestionIdx = answers.length;
  const quizFinished = activeQuestionIdx === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selected) {
      setAnswers(prevAnswers => [...prevAnswers, selected]);
  }, []);

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

  const shuffledAnswers = [...QUESTIONS[activeQuestionIdx].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={activeQuestionIdx}
          duration={10000}
          onTimeout={handleSkipAnswer}
        />
        <h2>{ QUESTIONS[activeQuestionIdx].text }</h2>
        <ul id="answers">
          { shuffledAnswers.map(answer => (
            <li key={answer} className="answer">
              <button onClick={ () => handleSelectAnswer(answer) }>
                { answer }
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}