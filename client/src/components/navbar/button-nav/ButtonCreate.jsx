import React from 'react'
import './button_create.css'

const ButtonCreate = ({onClickHandler, name}) => {
    return (
        <div className="button">
            <button onClick={() => onClickHandler()}>{name}</button>
        </div>
    )
}

export default ButtonCreate
