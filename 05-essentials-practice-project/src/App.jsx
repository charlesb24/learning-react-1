import Header from "./components/Header.jsx";
import UserInput from "./components/UserInput.jsx";
import ResultsTable from "./components/ResultsTable.jsx";
import {useState} from "react";
import {calculateInvestmentResults} from "./util/investment.js";

function App() {
  const [inputValues, setInputValues] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });

  function onValueChange(field, value) {
    setInputValues(prevState => {
      return {
        ...prevState,
        [field]: +value
      }
    })
  }

  const isValidDuration = inputValues.duration >= 1;

  const annualData = calculateInvestmentResults(inputValues);

  return (
    <>
      <Header />
      <UserInput handleChange={ onValueChange } investmentData={ inputValues } />
      { isValidDuration
        ? <ResultsTable resultsData={ annualData } />
        : <p className="center">Please enter a duration greater than zero.</p> }
    </>
  )
}

export default App
