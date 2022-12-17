import React from 'react'
import Project from './Project'
import './Projects.css'

const Projects = ({ projects, images }) => {

  return (
    <>
    <h3 className="heading">Projects</h3>
      <div className='main-projects-div' id='projects'>
        {
          projects.map((project, index) => {
            return <Project project={project} images = {images} key={index} />
          })
        }
      </div>
      <a href="#"><button className="see-all-projects visit-project">See All Projects &nbsp;<span className="gt">&gt;</span> </button></a>
    </>
  )
}

export default Projects
