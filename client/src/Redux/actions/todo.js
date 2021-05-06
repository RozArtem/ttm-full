import axios from 'axios'
import {
    addTask,
    changeStatusTask,
    deleteTask,
    editTask,
    findTask,
    sendTask,
    setTasks
} from "../reducers/tasksReduser"
import { API_URL } from "../../config";



export const getTodos = (project) => {

    axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    return async dispatch => {

        try {

            const response = await axios.get(`${API_URL}api/todos?id=${project}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(response)
            dispatch(setTasks(response.data))

        } catch (e) {

            alert(e.response.data.message)
        }

    }


}

export const createTodo = (todo) => {


    return async dispatch => {

        try {

            const response = await axios.post(`${API_URL}api/todos`, {
                ...todo
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(addTask(response.data))

        } catch (e) {

            alert(e.response.data.message)
        }

    }


}
export const deletItem = (id) => {


    return async dispatch => {

        try {

            const response = await axios.delete(`${API_URL}api/todos?id=${id}`,{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            
            dispatch(deleteTask(id))

        } catch (e) {

            alert(e.response.data.message)
        }

    }


}
export const sendItem = (todo, ID) => {


    return async dispatch => {

        try {

            const response = await axios.post(`${API_URL}api/todos/edit?id=${ID}`, {
                ...todo,
                
            },{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })  
            console.log(ID, todo)
            dispatch(sendTask(response.data))

        } catch (e) {

            alert(e.response.data.message)
        }

    }


}
export const changeStatusItem = (status, ID) => {


    return async dispatch => {

        try {

            const response = await axios.put(`${API_URL}api/todos/edit?id=${ID}`, {
                status,
                
            },{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })  

            
            dispatch(changeStatusTask(response.data.status))

        } catch (e) {

            alert(e.response.data.message)
        }

    }


}







