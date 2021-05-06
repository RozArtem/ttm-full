const SET_SHOW = "SET_SHOW"
const SET_SHOW_INFO = "SET_SHOW_INFO"
const SET_TASK = "SET_TASK"
const ADD_TASK = "ADD_TASK"
const FIND_TASK = "FIND_TASK"
const DELET_TASK = "DELET_TASK"
const EDIT_TASK = "EDIT_TASK"
const SEND_TASK = "SEND_TASK"
const CHANGE_TASK_STATUS = "CHANGE_TASK_STATUS"

const initialState = {
    tasks: [],
    isActiv: false,
    isShowInfo: false,
    curentTask: {}

}

const tasksReduser = (state = initialState, action) => {



    switch (action.type) {
        case SET_SHOW_INFO:


            return {
                ...state,
                isShowInfo: action.payload
            }
 
        case SET_SHOW:


            return {
                ...state,
                isActiv: action.payload
            };

        case SET_TASK:


            return {
                ...state,
                tasks: action.payload
            };

        case ADD_TASK:


            return {
                ...state,
                tasks: [...state.tasks, action.payload]
            };

        case FIND_TASK:
            return {
                ...state,
                curentTask: { ...state.tasks.find((elm) => elm._id === action.payload) }
            };

        case DELET_TASK:
            return {
                ...state,
                tasks: [...state.tasks.filter((elm) => elm._id !== action.payload)]
            };

        case EDIT_TASK:


            return {
                ...state,
                curentTask: {
                    ...state.curentTask, ...state.curentTask.status = action.payload

                }
            };

        case SEND_TASK:
            {
                const index = state.tasks.findIndex((elm) => elm._id === action.payload._id);

                const newArrr = [...state.tasks];
                newArrr[index] = action.payload;
                console.log(newArrr[index])
                return {
                    ...state,
                    tasks: newArrr

                };
            }


        case CHANGE_TASK_STATUS:

            {
                const index = state.tasks.findIndex((elm) => elm._id === state.curentTask._id);

                const newArrr = [...state.tasks];
                newArrr[index].status = action.payload;


                return {
                    ...state,
                    tasks: newArrr

                };

            }



        default:
            return state;
    }

}

export default tasksReduser;


export const setShowTaskModal = (toggler) => ({ type: SET_SHOW, payload: toggler })
export const setShowTaskModalInfo = (toggler) => ({ type:SET_SHOW_INFO, payload: toggler })
export const setTasks = (todos) => ({ type: SET_TASK, payload: todos })
export const addTask = (todo) => ({ type: ADD_TASK, payload: todo })
export const findTask = (todo) => ({ type: FIND_TASK, payload: todo })
export const deleteTask = (todo) => ({ type: DELET_TASK, payload: todo })
export const editTask = (todo) => ({ type: EDIT_TASK, payload: todo })
export const sendTask = (todo) => ({ type: SEND_TASK, payload: todo })
export const changeStatusTask = (todo) => ({ type: CHANGE_TASK_STATUS, payload: todo })
