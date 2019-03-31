import React from 'react'
import TopBar from '../components/TopBar'
import { Link } from 'react-router-dom'

export default class ArtistList extends React.Component {

    state = {
        artists: [],
    }

    controller = new AbortController()


    componentDidMount(){
        console.log("the component was mounted")
        this.request = fetch('/api/artists/?format=json', {signal: this.controller.signal})
            .then(data => {
                return data.json()
                .then(jsonData => {
                    this.setState({artists: jsonData})
                    this.request = null
                })
            })
    }

    componentWillUnmount() {
        console.log("will unmount")
        if(this.request){
            this.controller.abort();
        }
    }


    render(){
        return (<div className="container-fluid py-5 with-topbar">
            <TopBar></TopBar>
            <div className="row"></div>

        </div>)
    }

}