import React from 'react'
import './Project.css'

const Project = ({ project }) => {

  return (
    <div className="project-outer-box" id="Projects">
      <div id={"project" + project.sno} className="project">
        <div className='project-name'>{project.name}</div>
        <hr />
        <div>{project.details}</div>

        <a href={project.url} target="_blank"><button className="visit-project">Visit Project &nbsp;<span className="gt">&gt;</span> </button></a>
      </div>
    </div>
  )
}

export default Project
