import React from 'react'
import './Home.css'

const Home = ({innerRef}) => {
  return (
    <div className="home" ref={innerRef}>
      <div className="intro">
        <div className="intro1">
          <div className="letter">H</div>
          <div className="letter">i</div>
          <div className="letter">,</div>
          <div className="letter">&nbsp;I</div>
          <div className="letter">'</div>
          <div className="letter">m</div>
        </div>
        <div className="myName">
          <div className="firstLetter">S</div>
          <div className="letter">a</div>
          <div className="letter">u</div>
          <div className="letter">r</div>
          <div className="letter">a</div>
          <div className="letter">b</div>
          <div className="letter">h</div>
          <div className="letter">&nbsp;M</div>
          <div className="letter">a</div>
          <div className="letter">u</div>
          <div className="letter">r</div>
          <div className="letter">y</div>
          <div className="letter">a</div>
        </div>
      </div>
    </div>
  )
}

export default Home
