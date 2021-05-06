import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import Input from './Input/Input'
import './authorization.css'
import { registration } from '../../Redux/actions/user'
import { NavLink } from "react-router-dom";

const Registration = () => {
 
    
    
 
    
        const [email, setEmail] = useState("")
        const [name, setName] = useState("")
        const [password, setPassword] = useState("")
        const dispatch = useDispatch()
    
        
        return (
            <div>
                <div className='authorization'>
                <div className="authorization__header">Registration</div>
                <Input value={name} setValue={setName} type="text" placeholder="Enter name..."/>
                <Input value={email} setValue={setEmail} type="text" placeholder="Enter email..."/>
                <Input value={password} setValue={setPassword} type="password" placeholder="Enter password..."/>
                <button className="authorization__btn" onClick={() => registration(email, password, name)}>Sign Up</button>
                <div className="authorization__btn2"><NavLink to="/login"> have already  account? sign in</NavLink></div>
            </div>
        </div>
        )
    }
    
 

export default Registration
