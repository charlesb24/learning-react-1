import completionImg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.js";

export default function Summary({ answerData }) {
  const skippedAnswers = answerData.filter(answer => answer === null);
  const correctAnswers = answerData.filter((answer, i) => answer === QUESTIONS[i].answers[0]);

  const pctSkipped = Math.round((skippedAnswers.length / answerData.length) * 100);
  const pctCorrect = Math.round((correctAnswers.length / answerData.length) * 100);
  const pctWrong = 100 - pctSkipped - pctCorrect;

  return (
    <div id="summary">
      <img src={completionImg} alt="Trophy icon" />
      <h2>Quiz Completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{ pctSkipped }%</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{ pctCorrect }%</span>
          <span className="text">correct</span>
        </p>
        <p>
          <span className="number">{ pctWrong }%</span>
          <span className="text">wrong</span>
        </p>
      </div>
      <ol>
        {answerData.map((answer, i) => {
          let classes = 'user-answer';

          if (answer === null) {
            classes += ' skipped';
          } else if (answer === QUESTIONS[i].answers[0]) {
            classes += ' correct';
          } else {
            classes += ' wrong';
          }

          return (
            <li key={i}>
              <h3>{i + 1}</h3>
              <p className="question">{QUESTIONS[i].text}</p>
              <p className={classes}>{answer ?? 'Skipped'}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}