import React from 'react'
import TopBar from '../components/TopBar'
import { Link } from 'react-router-dom'
import chunk from 'lodash/chunk'
import truncate from 'lodash/truncate'


class ArtistCard extends React.Component {
    render() {
        const { artist } = this.props
        return (
            <div className="ArtistCard">
                <div className="card">
                    <img src={artist.image} className="card-img-top artist" alt={artist.name}/>
                    <div className="card-body">
                    <h5 className="card-title">{artist.name}</h5>
                    <p className="card-text description">
                        {truncate(artist.description, { length: 200 })}
                    </p>
                    <div className="text-center">
                        <Link to={`/artists/${artist.id}`} className="btn btn-primary">Dettagli</Link>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}



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
        const chunkedArtists = chunk(artists, 3)

        console.log("chunkedArtists", chunkedArtists)

        return (<div className="container-fluid pb-5 with-topbar">
            <TopBar></TopBar>
            {chunkedArtists.length > 0 && chunkedArtists.map((row, i) => (
                <div className="row mb-md-2" key={i}>
                    {row.map(artist => (
                        <div className="col-md-4 mb-2" key={artist.id}>
                            <ArtistCard artist={artist}></ArtistCard>
                        </div>
                    ))}
                </div>
            ))}

        </div>)
    }

}