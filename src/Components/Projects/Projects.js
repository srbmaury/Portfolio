import React from 'react'
import Project from '../Project/Project'
import './Projects.css'
import projects from '../../projects'
import { Link } from "react-router-dom";


const Projects = ({innerRef}) => {
  return (
    <div className='projects-outer-box' ref={innerRef}>
      <h3 className="heading">Projects</h3>
      <div className='main-projects-div'>
        {
          projects.slice(0,3).map((project, index) => {
            return <Project project={project} key={index} />
          })
        }
      </div>
      <Link to="/allProjects"><button className="see-all-projects visit-project">See All Projects &nbsp;<span className="gt">&gt;</span> </button></Link>
    </div>
  )
}

export default Projects
