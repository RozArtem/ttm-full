import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setProjectShow } from '../../Redux/reducers/projectReducer'
import { NavLink } from 'react-router-dom'
import { logout } from '../../Redux/reducers/userReducer'
import ButtonCreate from './button-nav/ButtonCreate'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";


import './navbar.css'
import { setShowTaskModal } from '../../Redux/reducers/tasksReduser'


const Navbar = () => {

    const currentLocation = window.location.pathname;
    console.log(currentLocation)
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()


    function createProjectHandler() {
        dispatch(setProjectShow(true))
    }

    function createTaskHandler() {
        dispatch(setShowTaskModal(true))
    }

    return (
        <div className="navbar">
            <div className="container">
                <NavLink to="/">
                    <div className="logo">
                        <p className="logo-name">Teams<span>Tasks</span>Manager</p>
                    </div>
                </NavLink>

                {isAuth ?

                    <div className="butoms">

                        <Switch>
                            <Route  path="/project/">
                                <ButtonCreate onClickHandler={createTaskHandler} name="Create task" />
                            </Route>
                            <Route path='/'>
                                <ButtonCreate onClickHandler={createProjectHandler} name="Create project" />
                            </Route>

                        </Switch>


                        <button onClick={() => dispatch(logout())} id="exit-task-btn">Log Out</button>

                    </div>


                    :

                    null
                }

            </div>
        </div>
    )
}

export default Navbar
