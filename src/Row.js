import React, { useEffect, useState } from 'react';
import './Row.css';
import axios from './axios';
import YouTube from 'react-youtube';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const baseUrl = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const request = await axios.get(fetchUrl);
                setMovies(request.data.results);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        }
        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        }
    };

    const handleClick = async (movie) => {
        try {
            const response = await axios.get(`/movie/${movie.id}/videos?api_key=702d025318f2c7cec1b8d28ee3cfa127`);
            const videos = response.data.results.filter(result => result.type === 'Trailer');
            if (videos.length > 0) {
                setTrailerUrl(videos[0].key);
                setShowModal(true);
            }
        } catch (error) {
            console.error('Error fetching trailer:', error);
            // Handle error (e.g., display a message to the user)
        }
    };

    const handleCloseModal = () => {
        setTrailerUrl("");
        setShowModal(false);
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 10, // Number of posters to show at a time
        slidesToScroll: 1,
        dots:false,
        arrows: false,
        autoplay: true,
      autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    infinite: true,
                    dots:false,
                    arrows: false,
                    autoplay: true,
                    autoplaySpeed: 5000
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots:false,
                    arrows: false,
                    autoplay: true,
                    autoplaySpeed: 5000
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots:false,
                    arrows: false,
                    autoplay: true,
                    autoplaySpeed: 5000
                }
            }
        ]
    };

    return (
        <>
        <div className='container-fluid pt-4'>
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
            <Slider {...settings}>
                {movies.map(movie => (

                    <div className='col-12 p-2 row-poster-col'> 
                    <img
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                        src={`${baseUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name}
                    />
                    </div>
                ))}
                </Slider>
            </div>
            {showModal && (
                <div className="modal" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <YouTube videoId={trailerUrl} opts={opts} />
                    </div>
                </div>
            )}
        </div>
        </div>
        </>
    );
}

export default Row;
