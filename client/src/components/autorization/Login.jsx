import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from "react-router-dom";
import Input from './Input/Input'
import './authorization.css'
import { login } from '../../Redux/actions/user'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()


    return (
        <div>
            <div className='authorization'>
                <div className="authorization__header">Authorization</div>
                <Input value={email} setValue={setEmail} type="text" placeholder="Enter email..." />
                <Input value={password} setValue={setPassword} type="password" placeholder="Enter password..." />
                <button className="authorization__btn" onClick={() => dispatch(login(email, password))}>Sign In</button>
                <div className="authorization__btn2"><NavLink to="/registration"> haven't account yet? sign up</NavLink></div>
            </div>
        </div>
    )
}


export default Login
