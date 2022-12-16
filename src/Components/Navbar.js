import React from 'react'
import './Navbar.css'

const Navbar = () => {
    const displayNav = () => {
        let navBar = document.querySelector('.navBar');
        let slice = document.querySelector('.slice');

        if(navBar.style.height === "500px"){
            navBar.style.height = "50px";
            slice.style.marginTop = "0px";
            slice.style.transform = "rotate(0deg)";
            slice = slice.nextSibling;
            slice.style.visibility = "visible";
            slice = slice.nextSibling;
            slice.style.transform = "rotate(0deg)";
            slice.style.marginTop = "0px";
        }else{
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
        <div className='navBar'>
            <div className="hamburger" onClick={displayNav}>
                <div className="slice"></div>
                <div className="slice"></div>
                <div className="slice"></div>
            </div>
            <div className="nav-item">Home</div>
            <div className="nav-item">About</div>
            <div className="nav-item">Skills</div>
            <div className="nav-item">Projects</div>
            <div className="nav-item">Resume</div>
            <div className="nav-item">Contact</div>
        </div>
    )
}

export default Navbar
