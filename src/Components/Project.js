import React from 'react'
import './Project.css'

const Project = ({project}) => {
  const first = () => {
    let self = document.getElementById("project" + project.sno);
    self.innerHTML = `
    <div className="project-name">
      {project.name}
    </div>`;
  }
  const second = () => {
    let self = document.getElementById("project" + project.sno);
    self.innerHTML = `
    <div className="project-details">
      {project.details}
    </div>`;
  }
  return (
    <div id={"project" + project.sno} className="project-outer-box" onMouseEnter={first} onMouseLeave={second}>

    </div>
  )
}

export default Project
