import {useState} from "react";

import QUESTIONS from "../questions.js";

export default function Quiz() {
  const [answers, setAnswers] = useState([]);

  const activeQuestionIdx = answers.length;

  function handleSelectAnswer(selected) {
    setAnswers(prevAnswers => [...prevAnswers, selected]);
  }

  return (
    <div id="quiz">
      <div id="question">
        <h2>{ QUESTIONS[activeQuestionIdx].text }</h2>
        <ul id="answers">
          { QUESTIONS[activeQuestionIdx].answers.map(answer => (
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