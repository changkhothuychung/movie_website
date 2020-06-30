import React, {useEffect, useState} from 'react'
import { Card } from 'antd';
import {useQuery} from '@apollo/react-hooks';
import { Button } from 'antd';
import {useParams} from 'react-router-dom';
import {getMovieById,getAllMovie} from '../schema/schema';
import { Spin } from 'antd';
import './movieItem.css';
import axios from 'axios';

const { Meta } = Card;



const MovieItem = (props) => {

    let { id } = useParams();

    const [senditem, senditemState] = useState({
        movies: 
        {

            videos: {
                results: [
                    {
                        key: '',
                    }
                ]
            },

            genres: [],

            images: {
                backdrops: [],
            },
            revenue: '',
            budget:'',
            release_date: '',
        },
    });
    const [backgroundImg, backgroundImgState] = useState();

    

    const {data, loading, error} = useQuery(getMovieById, {
        variables: {id}
    })

    const {data2, loading2, error2} = useQuery(getAllMovie);

    useEffect( () => {
       

        const data = async () => {
            await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=0aecc06bb4fadb06b5f071fef0c2ce6d&&language=en-US&append_to_response=videos%2Cimages&include_image_language=en%2Cnull&fbclid=IwAR0YGcvMYcFf8ieH8yGGDQZuxZ159CdSyQ_YXMqvPgamKd0jPSjWlZELaEg`
            ).then(result => {
                
                console.log("hello world")     
            
                senditemState({movies: {...result.data}});
                console.log(senditem);
                backgroundImgState({
                    background: `linear-gradient(rgba(0, 0, 0, 0.97) 10%,
                                    rgba(0, 0, 0, 0.92) 20%, 
                                    rgba(0, 0, 0, 0.92) 80%, 
                                    rgba(0, 0, 0, 0.97) 100%) 0% 0% / cover, 
                                    url(https://image.tmdb.org/t/p/w300${result.data.backdrop_path}),
                                    center center no-repeat rgb(44, 57, 73)`
                                    
                })
            }).catch(err => {
                console.log(err);
            })
        }
        data();
        
    }, []);


    if(loading){
        return(
            <React.Fragment>
                <div className="loading-mode">
                    <Spin className="spin" size="large" />
                    <h1>Loading</h1>
                </div>
            </React.Fragment>
        )
    }

    if(error){
        return(
            <React.Fragment>
                <h1> Error </h1>
            </React.Fragment>
        )
    }


   




    return(
        <React.Fragment  className="container">
                {!senditem.movies  ? (
                    <h1>hihih</h1>
                ) : (
                    <div className="item-container">

                    <div className="item-left">
                        
                        <div className="item-left-movie" >
                            <div className="item-left-img" >
                                <img 
                                    alt="example" 
                                    src={`https://image.tmdb.org/t/p/w300${data.searchById[0].poster_path}`} />
                            </div>
                        </div>
    
                        <div className="item-left-overview">
                            <p>{senditem.tagline}</p>
                        </div>
    
                        <div className="item-left-button">
                        
                            <button className="button1" ><a href={`https://www.youtube.com/watch?v=${senditem.movies.videos.results[0].key}`} target="_blank" >Watch Trailer</a></button>
                            <button className="button2" onClick={() => props.addMovie(data.searchById[0])} >Add To List</button>
    
                        </div>
    
                    </div>
    
    
                    <div className="item-middle">
                        <h1>{senditem.movies.title}</h1>
    
                        <div className="item-middle-genres">
                            {senditem.movies.genres.map((item, index) => {
                                if(index == senditem.movies.genres.length - 1){
                                    return(
                                         <p>{item.name}</p>
                                    )
                                }
                                else{
                                    return(
                                        <p>{item.name}<span>, </span></p>
                                   )
                                }
                            })}
                        </div>
    
                        <div className="item-middle-time-start">
    
                        </div>
    
                        <div className="item-middle-overview">
                            <h2>Overview</h2>
                            <p>{senditem.movies.overview}</p>
                        </div>
    
                        <div className="item-middle-addinfo">
                            <div>
                                <h3>Revenue</h3>
                                <p>{senditem.movies.revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                            </div>
    
                            <div>
                                <h3>Budget</h3>
                                <p>{senditem.movies.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                            </div>
    
                            <div>
                                <h3>Release Date</h3>
                                <p>{senditem.movies.release_date}</p>
                            </div>
                        </div>
                        
                    </div>
    
                    <div className="item-right">
    
    
                        {
    
                            senditem.movies.images.backdrops.map((item,index) => {
    
                                if(index < 3){
                                    return(
                                        <div className="item-right-img">
                                            <img  src={`https://image.tmdb.org/t/p/w300${item.file_path}`} />
                                        </div>
                                        )
                                    }
                                }
                            )
                        
                        }
                        
                            
                    </div>
    
                    </div>
                
                )}
           
                
            
            
        </React.Fragment>
    )
}


export default MovieItem; 