import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk";
import tasksReduser from './reducers/tasksReduser'
import userReducer from './reducers/userReducer';
import projectReducer from './reducers/projectReducer';



const rootReduser = combineReducers({

    todo: tasksReduser,
    user: userReducer,
    project: projectReducer

}) 

export const store = createStore(rootReduser, applyMiddleware(thunk))
 
