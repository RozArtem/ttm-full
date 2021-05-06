import axios from 'axios'
import {
    addProject,
    changeStatusProject,
    deleteProject,
    editProject,
    sendProject,
    setProjects
    
} from "../reducers/projectReducer"
import { API_URL } from "../../config";



export const getProjects = () => {

    axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

    return async dispatch => {

        try {

            const response = await axios.get(`${API_URL}api/project`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            dispatch(setProjects(response.data))

        } catch (e) {

            debugger
            alert(e.response.data.message)
        }

    }


}

export const createProject = (project) => {


    return async dispatch => {

        try {
        
            const response = await axios.post(`${API_URL}api/project`,
             {
                name:project
            }, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(addProject(response.data))

        } catch (e) {

            alert(e.response.data.message)
        }

    }


}
export const deletProjectItem = (id) => {


    return async dispatch => {

        try {
        
            const response = await axios.delete(`${API_URL}api/project?id=${id}`,{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(deleteProject(id))

        } catch (e) {

            console.log(e.response.data.message)
        }

    }


}
export const sendProjectItem = (project) => {


    return async dispatch => {

        try {

            const response = await axios.post(`${API_URL}api/project/edit`, {
                project
            }, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(sendProject(response.data))

        } catch (e) {

            alert(e.response.data.message)
        }

    }


}
export const changeStatusProjectItem = (status) => {


    return async dispatch => {

        try {

            const response = await axios.post(`${API_URL}api/project/edit`, {
                status
            }, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(changeStatusProject(response.data.project.status))

        } catch (e) {

            alert(e.response.data.message)
        }

    }


}

export const editiProjectItem = (project) => {


    try {

        editProject(project)

    } catch (e) {

        alert(e)
    }




}

