import React from 'react'
import './About.css'

const About = ({innerRef}) => {
    return (
        <div className="about" id="About" ref={innerRef}>
            <h3 className='heading'>About Me</h3>
            <div className="card">
                <div className="color">HEY</div>
                <div className="introduction">
                Myself <strong>Saurabh Maurya</strong>. <br/> Lorem ipsum dolor, sit amet <br/> consectetur adipisicing elit. Asperiores <br/> ipsum sit nisi magni sapiente nobis <br/> inventore praesentium atque totam qui <br/> velit perferendis explicabo ea, rerum <br/> reiciendis doloremque sint facere doloribus.
                </div>
            </div>
            <div className="card rotate"></div>
        </div>
    )
}

export default About
