import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {  sendItem } from '../../Redux/actions/todo';
import { editTask, setShowTaskModalInfo } from '../../Redux/reducers/tasksReduser';
import './taskmodal.css'



export const TaskModal = () => {

    let [isEdit, setIsEdit] = React.useState(false);

    const dispatch = useDispatch()
    const task = useSelector(state => state.todo.curentTask);


    const itialState = task;

    let [tas, setTask] = React.useState(itialState)

    const onChangeHandler = e => {

        setTask({ ...tas, [e.target.name]: e.target.value });

        console.log(e.target.name)
    }

    tas.dateCreate = new Date( tas.dateCreate).toISOString().substring(0, 16)
    tas.dateUntil = new Date( tas.dateCreate).toISOString().substring(0, 16)
  
    function onSend(e) {

        
        dispatch(sendItem(tas, task._id))
        dispatch(editTask(tas))
       
        dispatch(setShowTaskModalInfo(false))
        setIsEdit(false)
       
    }

    function onEdit() {


        setIsEdit(true)
    }

    function onCloseModal() {


        isEdit ? setIsEdit(false) : dispatch(setShowTaskModalInfo(false))

    }
    
   
    
    console.log()
    return (

        <div className="container-modal" >
            <div className="modal-box">
                <form className="box">
                    <h3>{task.name}</h3>
                    <div className="inp-zone">
                        <label htmlFor="name">Name task</label>
                        <input
                            onChange={isEdit ? (e) => onChangeHandler(e) : null}
                            type="text"
                            id="modal_inp"
                            name="name"
                            placeholder=""
                            value={tas.name}
                            disabled={isEdit ? null : "disabled"}
                        />
                    </div>

                    <div className="description">
                        <label htmlFor="coment">Description</label>
                        <textarea
                            onChange={isEdit ? (e) => onChangeHandler(e) : null}
                            name="descrition"
                            id="coment_area"
                            cols="30"
                            rows="10"
                            value={tas.descrition}
                            disabled={isEdit ? null : "disabled"}
                        >
                        </textarea>
                    </div>


                    <div className="modal__time-zone">
                        <div className="time__left">
                            <label htmlFor="inpstime1">Date create</label>
                            <input
                                onChange={isEdit ? (e) => onChangeHandler(e) : null}
                                name="dateCreate"
                                type="datetime-local"
                                value={tas.dateCreate}
                                disabled="disabled"
                                className="time__input"
                            />
                        </div>
                        <div className="time__right">
                            <label htmlFor="inptime2">Date until</label>
                            <input
                                onChange={isEdit ? (e) => onChangeHandler(e) : null}
                                name="dateUntil"
                                type="datetime-local"
                                value={tas.dateUntil}
                                className="time__input"
                                disabled={isEdit ? null : "disabled"}
                            />

                        </div>



                    </div>

                    <div className="btm-modal">
                        <div onClick={isEdit ? (e) => onSend(e) : (e) => onEdit(e)} id="submit-btm">
                            {isEdit ? 'Sent' : 'Edit'}
                        </div>

                        <div onClick={() => onCloseModal()} id='close'>
                            {isEdit ? 'Cancel' : 'Close'}
                        </div>

                    </div>
                </form>

            </div>

        </div>
    )
}
