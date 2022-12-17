import React from 'react'
import './Contact.css'

const Contact = () => {
    const myStyle = {
        paddingTop: "80px",
        minHeight:"100vh"
    }
    return (
        <div style={myStyle}>
            <h3 className="heading">Contacts</h3>
            <div className="form">
                <form method="POST">
                    <input type="text" id="fname" name="fname" placeholder='Enter Your name'/><br />
                    <input type="text" id="lname" name="lname" placeholder='Enter your email' /><br />
                    <textarea id="message" name="message" rows="4" cols="50" placeholder='Enter your message' />
                    <input type="submit" value="Submit" id='submit' />
                </form>
            </div>
        </div>
    )
}

export default Contact
