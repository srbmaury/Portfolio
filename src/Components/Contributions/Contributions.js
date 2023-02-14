import React from 'react'
import './Contributions.css';

const Contributions = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const change = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <h3 className="contributions" onClick={change}>
        My Github Contributions &nbsp;
        {isOpen ? (
          <span>&#x25B2;</span>
        ) : (
          <span>&#x25BC;</span>
        )}
      </h3>
      <ul id="list" className={isOpen ? 'open' : ''}>
        <li><a href="https://github.com/avinash201199/To-Do-List/pull/303">fixed dark-mode issue</a></li>
        <li><a href="https://github.com/ShivamWho/new-weather-app-react/pull/68">added local storage for dark mode</a></li>
        <li><a href="https://github.com/keshavgbpecdelhi/Web-Development/pull/299">added notes</a></li>
        <li><a href="https://github.com/harsh98trivedi/Simple-JavaScript-Calculator/pull/13">added calculation history</a></li>
        <li><a href="https://github.com/harsh98trivedi/Simple-JavaScript-Calculator/pull/15">fixed error in history</a></li>
        <li><a href="https://github.com/PritamSarbajna/tourism-website/pull/87">store dark mode in localStorage</a></li>
      </ul>
    </div>
  )
}

export default Contributions
