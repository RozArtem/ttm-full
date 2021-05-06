const SET_SHOW = "SET_SHOW"
const SET_PROJECT = "SET_PROJECT"
const ADD_PROJECT = "ADD_PROJECT"
const FIND_PROJECT = "FIND_PROJECT"
const DELET_PROJECT = "DELET_PROJECT"
const EDIT_PROJECT = "EDIT_PROJECT"
const SEND_PROJECT = "SESEND_PROJECTND_TASK"
const CHANGE_PROJECT_STATUS = "CHANGE_PROJECT_STATUS"

const initialState = {
    projects: [],
    curentProject: {},
    isActiv: false

}

const projectReducer = (state = initialState, action) => {


    switch (action.type) {
        case SET_SHOW:


            return {
                ...state,
                isActiv: action.payload
            };

        case SET_PROJECT:


            return {
                ...state,
                projects: action.payload
            };

        case ADD_PROJECT:


            return {
                ...state,
                projects: [...state.projects, action.payload]
            };

        case FIND_PROJECT:
            return {
                ...state,
                curentProject: { ...state.projects.find((elm) => elm._id === action.payload) },

            };

        case DELET_PROJECT:
            return {
                ...state,
                projects: [...state.projects.filter((elm) => elm._id !== action.payload)]
            };

        case EDIT_PROJECT:


            return {
                ...state,
                curentProject: {
                    ...state.curentProject, ...action.payload

                }
            };

        case SEND_PROJECT:
            {
                const index = state.projects.findIndex((elm) => elm.id === action.payload.id);

                const newArrr = [...state.projects];
                newArrr[index] = action.payload;

                return {
                    ...state,
                    projects: newArrr

                };
            }


        case CHANGE_PROJECT_STATUS:

            {
                const index = state.projects.findIndex((elm) => elm.id === action.payload.id);

                const newArrr = [...state.projects];
                newArrr[index] = action.payload;

                return {
                    ...state,
                    projects: newArrr

                };
            }



        default:
            return state;
    }

}

export default projectReducer;


export const setProjectShow = (status) => ({ type: SET_SHOW , payload: status})
export const setProjects = (projects) => ({ type: SET_PROJECT, payload: projects })
export const addProject = (project) => ({ type: ADD_PROJECT, payload: project })
export const findProject = (project) => ({ type: FIND_PROJECT, payload: project })
export const deleteProject = (project) => ({ type: DELET_PROJECT, payload: project })
export const editProject = (project) => ({ type: EDIT_PROJECT, payload: project })
export const sendProject = (project) => ({ type: SEND_PROJECT, payload: project })
export const changeStatusProject = (project) => ({ type: CHANGE_PROJECT_STATUS, payload: project })
