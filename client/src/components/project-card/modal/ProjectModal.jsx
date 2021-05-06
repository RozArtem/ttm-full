import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createProject } from '../../../Redux/actions/project'
import { setProjectShow } from '../../../Redux/reducers/projectReducer'
import './project-modal.css'


const ProjectModal = () => {

    const [project, setProject] = useState('')
    const dispatch = useDispatch()

    function onClickHandler() {

      
        dispatch(createProject(project))
        dispatch(setProjectShow(false))
        setProject('')

    }

   
    return (
        <div className="modal" onClick={() => { dispatch(setProjectShow(false))}}>
            <div className="modal___container" onClick={(event => event.stopPropagation())} >

                <input 
                className="modal___inp" 
                type="text"
                maxlength="20"
                 autoFocus onChange={(e) => { setProject(e.target.value) }} />

                <button className="modal___btn" onClick={() => onClickHandler()}>Create</button>

            </div>
        </div>
    )
}

export default ProjectModal
