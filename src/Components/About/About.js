import React from 'react'
import './About.css'

const About = ({innerRef}) => {
    return (
        <div className="about" ref={innerRef}>
            <h3 className='heading'>About Me</h3>
            <div className="card">
                <div className="color">HEY</div>
                <div className="introduction">
                Myself <strong>Saurabh Maurya</strong>. <br/> My skills include Problem-Solving, <br/> Machine Learning and Web Development. <br/> I thrive on challenges and am passionate about <br/> leveraging technology to create innovative solutions. <br/> In Development I have worked with MERN stack and  <br/> Django web framework.
                </div>
            </div>
            <div className="card rotate"></div>
        </div>
    )
}

export default About
