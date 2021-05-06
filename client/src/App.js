import React, { useEffect } from 'react'
import Home from './components/pages/home/Home'
import Registration from './components/autorization/Registration'
import Login from './components/autorization/Login'

import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { auth } from './Redux/actions/user'
import Navbar from './components/navbar/Navbar'
import ProjectPage from './components/pages/project/ProjectPage';



export const App = () => {

  const isAuth = useSelector(state => state.user.isAuth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(auth())
  }, [])

  return (

    <Router>

      <Navbar />
      {!isAuth ?
        <Switch>
          <Route path="/registration" component={Registration} />
          <Route path="/login" component={Login} />
          <Redirect to='/login' />
        </Switch>
        :
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path='/project'>
            <ProjectPage />
          </Route>
          <Redirect to="/" />
        </Switch>
      }

    </Router>

  )
}
