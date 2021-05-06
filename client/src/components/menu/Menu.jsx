import React from 'react'
import { Link } from 'react-router-dom'
import './menu.css'

export const Menu = () => {
    return (
        <div className="menu-cont">
            <ul className="menu-ul">
                <Link to="/todo"><li>TODO</li></Link>
                <Link to="/procces"><li>INPROCCES</li></Link>
                <Link to="/done"> <li>DONE</li></Link>
            </ul>
        </div>
    )
}
