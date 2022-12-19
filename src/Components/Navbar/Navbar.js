import React from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'

const Navbar = ({displayNav, scrollToSection, home, about, skills, projects, contact}) => {

    return (
        <nav className='navBar'>
                <div className="hamburger" onClick={displayNav}>
                    <div className="slice"></div>
                    <div className="slice"></div>
                    <div className="slice"></div>
                </div>
                <div onClick={() => scrollToSection(home)} className="nav-item active"><NavLink to="/Home">Home</NavLink></div>
                <div onClick={() => scrollToSection(about)} className="nav-item"><NavLink to="/About">About</NavLink></div>
                <div onClick={() => scrollToSection(skills)} className="nav-item"><NavLink to="/Skills">Skills</NavLink></div>
                <div onClick={() => scrollToSection(projects)} className="nav-item"><NavLink to="/Projects">Projects</NavLink></div>
                <div className="nav-item"><a href="#">Resume</a></div>
                <div onClick={() => scrollToSection(contact)} className="nav-item"><NavLink to="/Contact">Contact</NavLink></div>
        </nav>
    )
}

export default Navbar
