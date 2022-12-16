import React from 'react'
import Project from './Project'

const Projects = ({ projects }) => {
  const myStyle = {
    margin: "120px",
    minHeight:"100vh"
  }
  return (
    <>
    <h3 className="heading">Projects:</h3>
      <div style={myStyle} id='projects'>
        {
          projects.map((project, index) => {
            return <Project project={project} key={index} />
          })
        }
      </div>
    </>
  )
}

export default Projects
