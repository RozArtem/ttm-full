import React, { useEffect, useState } from 'react'
import TaskCard from '../../card-task/TaskCard'
import { CreatTask } from '../../modal-creat/CreatTask'
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { changeStatusItem, getTodos } from '../../../Redux/actions/todo';
import { TaskModal } from '../../modal-task-info/TaskModal';
import './progetpage.css';
import { editTask, findTask } from '../../../Redux/reducers/tasksReduser';

const ProjectPage = () => {


    const { pathname } = useLocation()
    const projectID = pathname.split('/')[pathname.split('/').length - 1]
    const isShowModal = useSelector(state => state.todo.isActiv)
    const isShowModalInfo = useSelector(state => state.todo.isShowInfo)
    const items = useSelector(state => state.todo.tasks).filter(elm => elm.project === projectID )
    const Project = useSelector(state => state.project.curentProject)
    const ID = useSelector(state => state.todo.curentTask._id)
    const dispatch = useDispatch()

    
    useEffect(() => {

        dispatch(getTodos())
    }, [])

    console.log(isShowModalInfo)


    const [zoneDropNew, setZoneDropNew] = useState(false)
    const [zoneDropInProcces, setZoneDropInProcces] = useState(false)
    const [zoneDropDone, setzoneDropDone] = useState(false)
    ///drag and drop

    function dragEnterHandler(e) {
        e.preventDefault()
        e.stopPropagation()

        switch (e.target.className) {
            case 'colum_new table':
                setZoneDropNew(true)
                console.log(   e.target.before)
             

                break;
            case 'colum_in_process table':
                setZoneDropInProcces(true)

                break;
            case 'colum_done table':
                setzoneDropDone(true)

                break;

            default:
                break;
        }

    }
    function dragStarthandler(e, id) {

        e.stopPropagation()
        dispatch(findTask(id))


        console.log(id)
    }
    function dragDropHandler(e) {

        switch (e.target.className) {
            case 'colum_new table dropZone' :
                console.log('drop in:', e.target.className)
                dispatch(changeStatusItem('new', ID))

                break;
            case 'colum_in_process table dropZone':
                console.log('drop in:', e.target.className)
                dispatch(changeStatusItem('inprocces', ID))

                break;
            case 'colum_done table dropZone' :
                console.log('drop in:', e.target.className)
                dispatch(changeStatusItem('done', ID))

                break;

            default:
                break;
        }

        e.stopPropagation()


    }
    function dragEndHandler(e) {
        e.preventDefault()
        e.stopPropagation()
        setZoneDropNew(false)

        setZoneDropInProcces(false)
        setzoneDropDone(false)
    }

    function dragLeave(e) {
        e.preventDefault()
        e.stopPropagation()

        switch (e.target.className) {
            case 'colum_new table dropZone':
                setZoneDropNew(false)

                break;
            case 'colum_in_process table dropZone':
                setZoneDropInProcces(false)

                break;
            case 'colum_done table dropZone':
                setzoneDropDone(false)

                break;

            default:
                break;
        }


    }

    function dragOver(e) {
        e.preventDefault()
        e.stopPropagation()


    }

    return (
        <div className="project___container">
            <div className="project___title"> <h3>{Project.name}</h3> </div>

            <div className="project___table" onClick={(e) => console.log(e.target)}>
                <div className={zoneDropNew ? "colum_new table dropZone" : "colum_new table"}
                    onDragEnter={(e) => dragEnterHandler(e)}
                    onDrop={(e) => dragDropHandler(e)}
                    onDragOver={(e) => { dragOver(e) }}
                    onDragEnd={(e) => { dragEndHandler(e) }}
                    onDragLeave={(e) => { dragLeave(e) }}
                >

                    {items.map((elm) => {
                        if (elm.status === 'new') {

                            return <TaskCard
                                key={elm._id}
                                {...elm}
                                onStart={dragStarthandler} />
                        }
                        return
                    })}
                </div>
                <div className={zoneDropInProcces ? "colum_in_process table dropZone" : "colum_in_process table"}
                    onDragEnter={(e) => dragEnterHandler(e)}
                    onDrop={(e) => dragDropHandler(e)}
                    onDragOver={(e) => { dragOver(e) }}
                    onDragEnd={(e) => { dragEndHandler(e) }}
                    onDragLeave={(e) => { dragLeave(e) }}

                >


                    {items.map((elm) => {
                        if (elm.status === 'inprocces') {

                            return <TaskCard
                                key={elm._id}
                                {...elm}
                                onStart={dragStarthandler} />
                        }
                        return
                    })}
                </div>
                <div className={zoneDropDone ? "colum_done table dropZone" : "colum_done table"}
                    onDragEnter={(e) => dragEnterHandler(e)}
                    onDrop={(e) => dragDropHandler(e)}
                    onDragOver={(e) => { dragOver(e) }}
                    onDragEnd={(e) => { dragEndHandler(e) }}
                    onDragLeave={(e) => { dragLeave(e) }}

                >  {items.map((elm) => {
                    if (elm.status === 'done') {

                        return <TaskCard
                            key={elm._id}
                            {...elm}
                            onStart={dragStarthandler} />
                    }
                    return
                })}
                </div>

            </div>
            {isShowModal && <CreatTask />}
            {isShowModalInfo && <TaskModal />}

        </div>
    )
}

export default ProjectPage
