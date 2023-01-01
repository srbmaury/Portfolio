import React from 'react'
import './Navbar.css'

const Navbar = ({displayNav, scrollToSection, home, about, skills, projects, contact}) => {

    return (
        <nav className='navBar'>
                <div className="hamburger" onClick={displayNav}>
                    <div className="slice"></div>
                    <div className="slice"></div>
                    <div className="slice"></div>
                </div>
                <div id="Home" onClick={() => scrollToSection(home, "Home")} className="nav-item active">Home</div>
                <div id="About" onClick={() => scrollToSection(about, "About")} className="nav-item">About</div>
                <div id="Skills" onClick={() => scrollToSection(skills, "Skills")} className="nav-item">Skills</div>
                <div id="Projects" onClick={() => scrollToSection(projects, "Projects")} className="nav-item">Projects</div>
                <div id="Resume" className="nav-item"><a href="../Portfolio/resume.pdf" target="_blank" rel="noreferrer">Resume</a></div>
                <div id="Contact" onClick={() => scrollToSection(contact, "Contact")} className="nav-item">Contact</div>
        </nav>
    )
}

export default Navbar
