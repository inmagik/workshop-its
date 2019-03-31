import React from 'react'
import TopBar from '../components/TopBar'
import { Link } from 'react-router-dom'
import chunk from 'lodash/chunk'


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
        const { artists } = this.state
        const chunkedArtists = chunk(artists, 2)

        console.log("chunkedArtists", chunkedArtists)

        return (<div className="container-fluid pb-5 with-topbar">
            <TopBar></TopBar>
            {chunkedArtists.length > 0 && chunkedArtists.map((row, i) => (
                <div className="row">
                    {row.map(artist => (
                        <div className="col">
                        {artist.name}
                        </div>
                    ))}

                </div>
            ))}

        </div>)
    }

}