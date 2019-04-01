import React from 'react'
import TopBar from '../components/TopBar'
import Lightbox from 'react-image-lightbox';



class ImagesGallery extends React.Component {

    state = {
        photoIndex: 0,
        isOpen: false,
    }

    render() {
        const { artworks } = this.props
        const images = artworks.map(artwork => artwork.image)
        const { isOpen, photoIndex } = this.state

        return (
            <div className="ImagesGallery">
                <div className="row mt-4">
                    {artworks.map(artwork => (
                        <div className="col-md-3 mb-4" key={artwork.id} onClick={()=>{this.setState({isOpen: true})}}>
                            <img className="artwork-thumb" src={artwork.image}></img>
                            <div className="artwork-info p-2 bg-light">
                                <b>{artwork.title}</b>
                                <p> {artwork.year}</p>
                            </div>

                        </div>
                    ))}
                </div>

                {isOpen && (
                    <Lightbox
                        mainSrc={images[photoIndex]}
                        nextSrc={images[(photoIndex + 1) % images.length]}
                        prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        onMovePrevRequest={() =>
                        this.setState({
                            photoIndex: (photoIndex + images.length - 1) % images.length,
                        })
                        }
                        onMoveNextRequest={() =>
                        this.setState({
                            photoIndex: (photoIndex + 1) % images.length,
                        })
                        }
                    />
                    )}
            </div>
        )
    }
}




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

        return (<div className="container with-topbar ArtistDetail pb-4">
            <TopBar></TopBar>
            {artist && <div className="">
                <div className="row">
                    <div className="col-md-3">
                        <img className="artist" src={artist.image}></img>
                    </div>
                    <div className="col-md-9 d-flex flex-column justify-content-center">
                        <div className="p-2">
                            <h2>{artist.name}</h2>
                            <i>{artist.birth_date} - {artist.death_date}</i>
                            <p className="mt-2">{artist.description}</p>
                        </div>
                    </div>
                </div>
                
                {/* images gallery */}
                <h3 className="mt-4">Opere</h3>
                {artist.artworks.length > 0 && <ImagesGallery  artworks={artist.artworks}/>}


            </div>}

            

        </div>)
    }

}