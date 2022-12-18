import "./App.css";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import About from "./Components/About/About";
import SkillsDuel from "./Components/Skills/SkillsDuel";
import Skills from "./Components/Skills/Skills";
import Projects from "./Components/Projects/Projects";
import Contact from "./Components/Contact/Contact";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter as Router} from "react-router-dom";
import React, { useRef } from "react";
function App() {
  const home = useRef(null);
  const about = useRef(null);
  const skills = useRef(null);
  const projects = useRef(null);
  const contact = useRef(null);

  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop-100,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Router>
        <Navbar
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
      </Router>
    </>
  );
}

export default App;
