import React from 'react'

import './Contact.css'
import send from './../../Images/send.png'
import mail from './../../Images/mail.png'
import telephone from '../../Images/telephone.png'
import location from '../../Images/location.png'

const Contact = ({innerRef}) => {
    return (
        <div className='contact-section' id="Contact">
            <h3 className="heading contact-heading" ref={innerRef} >Contact</h3>
            <div id='outer-box'>
                <div className="form">
                    <form method="POST">
                        <input type="text" id="fname" name="fname" placeholder='Enter Your name' /><br />
                        <input type="text" id="lname" name="lname" placeholder='Enter your email' /><br />
                        <textarea id="message" name="message" rows="4" cols="50" placeholder='Enter your message' />
                        <button id="submit">Send <img src={send} alt='send' id='sending' /></button>
                    </form>
                </div>
                <div id='contacts'>
                    <div className="contact">
                        <div className="icons-background">
                            <img src={mail} alt="mail" className='icons' />
                        </div>
                        <div className="name">srbmaury@gmail.com</div>
                    </div>
                    <div className="contact">
                        <div className="icons-background">
                            <img src={telephone} alt="mail" className='icons' />
                        </div>
                        <div className="name">+91 73550 69174</div>
                    </div>
                    <div className="contact">
                        <div className="icons-background">
                            <img src={location} alt="mail" className='icons' />
                        </div>
                        <div className="name">Chandauli, Uttar Pradesh <br/> India, 232110</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
