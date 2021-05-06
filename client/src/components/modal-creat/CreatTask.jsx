import React, { useEffect } from 'react'
import './CreatTask.css'
import { useDispatch, useSelector } from 'react-redux'
import { setShowTaskModal } from '../../Redux/reducers/tasksReduser'
import { createTodo } from '../../Redux/actions/todo'



export const CreatTask = ({

}) => {

    const dispatch = useDispatch()
    const { _id } = useSelector(state => state.project.curentProject)
    const isCloseModal = useSelector(state => state.todo.isActiv)


    useEffect(() => {
        setTask({

            project: _id,
            status: 'new'
        })
    }, [])


    console.log(_id)
    const itialState = {
        name: '',
        descrition: '',
        dateCreate: '',
        dateUntil: '',
    
       
    }

    let [task, setTask] = React.useState(itialState)



    const onChangeHandler = e => {

        setTask({ ...task, [e.target.name]: e.target.value });
    }
    
    const addTask = () => {

        dispatch(createTodo(task))
        dispatch(setShowTaskModal(false))
        console.log(task)
        setTask(itialState)
    }

    function closeModal() {

        setTask(itialState)
        dispatch(setShowTaskModal(false))
    }
    return (
        <div className="container-modal">
            <div className="modal-box">
                <form className="box">
                    <h3>Create task</h3>
                    <div className="inp-zone">
                        <label htmlFor="name">Name task</label>
                        <input
                            onChange={(e) => onChangeHandler(e)}
                            type="text"
                            id="modal_inp"
                            name="name"
                            placeholder="Add name"
                            value={task.name}
                            maxlength="15"
                        />
                    </div>

                    <div className="description">
                        <label htmlFor="coment">Description</label>
                        <textarea
                            onChange={(e) => onChangeHandler(e)}
                            name="descrition"
                            id="coment_area"
                            cols="30"
                            rows="10"
                            value={task.descrition}
                        >
                        </textarea>
                    </div>


                    <div className="time-zone">
                        <div className="time-r">
                            <label htmlFor="inpstime1">Until</label>
                            <input
                                onChange={(e) => onChangeHandler(e)}
                                name="dateUntil"
                                id="time-inp"
                                type="datetime-local"
                                value={task.dateUntil}
                            />
                        </div>
                    </div>

                    <div className="btm-modal">
                        <div onClick={() => { addTask() }} id="submit-btm">Create task</div>

                        <div onClick={() => {closeModal()}}id='close'>Cancel</div>

                    </div>
                </form>

            </div>

        </div>
    )
}
