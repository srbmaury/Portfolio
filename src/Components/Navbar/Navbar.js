import React from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'

const Navbar = ({scrollToSection, home, about, skills, projects, contact}) => {

    const displayNav = () => {
        let navBar = document.querySelector('.navBar');
        let slice = document.querySelector('.slice');

        if (navBar.style.height === "500px") {
            navBar.style.height = "50px";
            slice.style.marginTop = "0px";
            slice.style.transform = "rotate(0deg)";
            slice = slice.nextSibling;
            slice.style.visibility = "visible";
            slice = slice.nextSibling;
            slice.style.transform = "rotate(0deg)";
            slice.style.marginTop = "0px";
        } else {
            navBar.style.height = "500px";
            slice.style.marginTop = "15px";
            slice.style.transform = "rotate(45deg)";
            slice = slice.nextSibling;
            slice.style.visibility = "hidden";
            slice = slice.nextSibling;
            slice.style.transform = "rotate(135deg)";
            slice.style.marginTop = "-18px";
        }
    }
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
