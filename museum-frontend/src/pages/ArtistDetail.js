import React from 'react'
import TopBar from '../components/TopBar'


export default class ArtistDetail extends React.Component {

    state = {
        artist: null,
    }

    controller = new AbortController()

    componentDidMount(){
        console.log("the component was mounted")
        const { match } = this.props
        const { params } = match

        this.request = fetch(`/api/artists/${params.id}/?format=json`, {signal: this.controller.signal})
            .then(data => {
                return data.json()
                .then(jsonData => {
                    this.setState({artist: jsonData})
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
        const { artist } = this.state

        return (<div className="container with-topbar ArtistDetail">
            <TopBar></TopBar>
            {artist && <div className="">
                <div className="row">
                    <div className="col col-3">
                        <img className="artist" src={artist.image}></img>
                    </div>
                    <div className="col d-flex flex-column justify-content-center">
                        <div className="p-2">
                            <h2>{artist.name}</h2>
                            <i>{artist.birth_date} - {artist.death_date}</i>
                            <p className="mt-2">{artist.description}</p>
                        </div>
                    </div>
                </div>
            </div>}

        </div>)
    }

}