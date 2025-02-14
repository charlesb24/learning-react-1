import headerImage from '../assets/investment-calculator-logo.png';

export default function Header() {
  return (
    <header id="header">
      <img src={ headerImage }  alt="Logo for react investment calculator"/>
      <h1>React Investment Calculator</h1>
    </header>
  )
}