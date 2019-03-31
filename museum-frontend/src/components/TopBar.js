import React from 'react'
import { Link } from 'react-router-dom'

export default class TopBar extends React.Component {

    render (){
        return (
            <nav className="navbar fixed-top navbar-dark bg-primary">
                <Link to="/" className="text-white navbar-brand">Museo ITS</Link>
            </nav>
        )
        
    }
}