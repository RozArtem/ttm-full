import React,  { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletItem } from '../../Redux/actions/todo'
import { findTask, setShowTaskModalInfo } from '../../Redux/reducers/tasksReduser'
import './task-card.css'

const TaskCard = ({ name, dateCreate, dateUntil, _id, onStart }) => {

    const project = useSelector(state => state.project.curentProject)
    const author = useSelector(state => state.user.currentUser.name)

    const [deletToggler, setdeletToggler] = useState(false)

    function deleteToggler(e) {


        setdeletToggler(!deletToggler)
    }

    const dispatch = useDispatch()

    function deleteItem(e) {
        e.stopPropagation()
        dispatch(deletItem(_id))
    }
    function ShowTaskModalInfo(e) {
        e.stopPropagation()
        dispatch(setShowTaskModalInfo(true))
        dispatch(findTask(_id))


    }
    return (
        <div
            onDragStart={(e) => onStart(e, _id)}
            
            className={deletToggler ? "task-card delete" : "task-card"}
            onClick={(e) => { ShowTaskModalInfo(e) }}
            draggable={true}
        >
            <div className="task-card___container">
                <div className="task-card___name">{name}
                    <span onClick={(e) => { deleteItem(e) }}
                        className="delete_btn"
                        onMouseEnter={(e) => deleteToggler(e)}
                        onMouseLeave={(e) => deleteToggler(e)}>X</span></div>
                <div className="task-card___date">
                    <div className="date___create">{dateCreate}</div>
                    {dateUntil && <div className="date____until">{dateUntil}</div>}
                </div>
                <div className="task-card___info">
                    <div className="info___project">author:</div>
                    <div className="info___author">{author}</div>
                </div>

            </div>
        </div>
    )
}

export default TaskCard



