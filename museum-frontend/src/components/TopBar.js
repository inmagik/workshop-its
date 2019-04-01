import React from 'react'
import { Link } from 'react-router-dom'

export default class TopBar extends React.Component {

    render (){
        const { title } = this.props
        return (
            <nav className="navbar fixed-top navbar-dark bg-primary">
                <div>
                <Link to="/" className="text-white navbar-brand">Museo ITS</Link>
                {title && <span className="navbar-text">
                    {title}
                </span>}
                </div>
            </nav>
        )
        
    }
}