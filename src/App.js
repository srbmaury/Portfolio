import "./App.css";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import About from "./Components/About/About";
import SkillsDuel from "./Components/Skills/SkillsDuel";
import Skills from "./Components/Skills/Skills";
import Projects from "./Components/Projects/Projects";
import Contact from "./Components/Contact/Contact";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter as Router } from "react-router-dom";
import React, { useRef, useState, useEffect } from "react";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
function App() {
  const home = useRef(null);
  const about = useRef(null);
  const skills = useRef(null);
  const projects = useRef(null);
  const contact = useRef(null);

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

  const scrollToSection = (elementRef) => {
    if(window.innerWidth <= 912)
      displayNav();
    window.scrollTo({
      top: elementRef.current.offsetTop - 100,
      behavior: "smooth",
    });
  };

  const [backToTopVisible, setBackToTopVisible] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', ()=>{
      console.log('Scroll', window.pageYOffset>0);
      setBackToTopVisible(window.pageYOffset>0);
    });
  }, [])
  
  return (
    <>
      <Router>
        <Navbar
          displayNav={displayNav}
          scrollToSection={scrollToSection}
          home={home}
          about={about}
          skills={skills}
          projects={projects}
          contact={contact}
        />
        <Home innerRef={home} />
        <About innerRef={about} />
        <SkillsDuel innerRef={skills} />
        <Skills />
        <Projects innerRef={projects} />
        <Contact innerRef={contact} />
        <Footer />
        <ScrollToTop backToTopVisible={backToTopVisible}/>
      </Router>
    </>
  );
}

export default App;
