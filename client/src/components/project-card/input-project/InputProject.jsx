import React from 'react'
import './input_project.css'

const InputProject = ({max, value}) => {
    return (
        
            <progress className="project-input" max={max} value={value} />
        
    )
}

export default InputProject
