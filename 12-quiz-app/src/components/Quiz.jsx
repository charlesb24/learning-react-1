import {useCallback, useState} from "react";

import QUESTIONS from "../questions.js";
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

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
    return <Summary answerData={answers} />
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