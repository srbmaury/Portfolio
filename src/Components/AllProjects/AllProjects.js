import React from 'react'
import Project from '../Project/Project'
import projects from '../../projects'
import './AllProjects.css'
import { Link } from 'react-router-dom'

const Projects = ({ innerRef }) => {

  return (
    <div className='all-projects-outer-box' id='AllProjects' ref={innerRef}>
      <h3 className="heading">All Projects</h3>
      <Link to='/'>
        <div className="return"></div>
      </Link>
      <div className='all-projects-div row'>
        {
          projects.map((project, index) => {
            return <div className='single-project' key={index}><Project project={project} key={index} /></div>
          })
        }
      </div>
    </div>
  )
}

export default Projects
