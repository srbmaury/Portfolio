import React from 'react'
import Project from './Project'
import './Projects.css'
import projects from '../../projects'

const Projects = ({innerRef}) => {

  return (
    <div className='projects-outer-box' id='Projects' ref={innerRef}>
      <h3 className="heading">Projects</h3>
      <div className='main-projects-div'>
        {
          projects.map((project, index) => {
            return <Project project={project} key={index} />
          })
        }
      </div>
      <a href="#"><button className="see-all-projects visit-project" disabled title='Yet to be implemented'>See All Projects &nbsp;<span className="gt">&gt;</span> </button></a>
    </div>
  )
}

export default Projects
