
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { auth } from '../../../Redux/actions/user'
import { getProjects } from '../../../Redux/actions/project';
import Project from '../../project-card/card/Project';
import ProjectModal from '../../project-card/modal/ProjectModal';

import '../main.css';
import './home.css';




function Home() {

  const dispatch = useDispatch()

  useEffect(() => {

   
    dispatch(getProjects())
  }, [])

  
  

  const isShowModal = useSelector(state => state.project.isActiv)
  const projects = useSelector(state => state.project.projects)



  return (


    <div className="home"  >

      <div className="home___container">


        {projects.map(el =>
          <Project
            key={el._id}
            name={el.name}
            id={el._id}
          />
        )}
        {isShowModal && <ProjectModal />}


      </div>

    </div>


  )
}

export default Home;
