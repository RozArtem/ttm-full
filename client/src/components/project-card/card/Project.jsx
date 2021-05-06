import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletProjectItem } from '../../../Redux/actions/project'
import { useHistory } from "react-router-dom"
import InputProject from '../input-project/InputProject'
import './project.css'
import { findProject } from '../../../Redux/reducers/projectReducer'


const Project = ({ name, id }) => {



    const dispatch = useDispatch()
    const histori = useHistory()


    const [deletToggler, setdeletToggler] = useState(false)



    const items = useSelector(state => state.todo.tasks).filter(elm => elm.project === id)

    const itemsDone = items.filter(elm => elm.status === 'done')
    console.log(items.length, itemsDone.length, id)

    function deleteToggler(e) {


        setdeletToggler(!deletToggler)
    }

    function deleteItem(e) {

        e.stopPropagation()
        dispatch(deletProjectItem(id))
    }

    function setCurentProject() {

        dispatch(findProject(id))
        histori.push('/project' + "/" + id)
    }

    const z = '/'
    return (
        <div onClick={() => setCurentProject()}
            className={deletToggler ? "project project_delete" : "project"} >
            <div className="project___delete"
                onClick={(e) => { deleteItem(e) }}
                onMouseEnter={(e) => deleteToggler(e)}
                onMouseLeave={(e) => deleteToggler(e)}>X</div>
            <div className={deletToggler ? "project___name project_delete_name" : "project___name"}>
                {name}
            </div>
            <div className="project___tasks-trakcer">
                {itemsDone.length === items.length  ?
                    items.length > 0 ? 'Completed' : 'Empty'
                    :
                    <div >
                        <span className="project___span"> {itemsDone.length}</span>  /  {items.length}
                    </div>
                }


            </div>
            <div className="project___progress">
                <InputProject max={items.length} value={itemsDone.length} />
            </div>

        </div>
    )
}

export default Project
