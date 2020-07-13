import React, {useEffect, useState} from 'react'
import { Card } from 'antd';
import {useQuery} from '@apollo/react-hooks';
import { Button } from 'antd';
import {useParams, useHistory} from 'react-router-dom';
import {getMovieById,getAllMovie, getMovieSearchName} from '../schema/schema';
import { Spin } from 'antd';
import './movieItem.css';
import './movieItemCondition.css';
import axios from 'axios';
import {Link, withRouter} from 'react-router-dom'
import {LeftOutlined, ClockCircleFilled,StarFilled} from '@ant-design/icons';
import BackButton from './backButton';
import { LoadingOutlined } from '@ant-design/icons';
const { Meta } = Card;





const MovieItem = (props) => {

    const history = useHistory();

    let { id } = useParams();
    console.log("id " + id); 
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
            poster_path: '',
        },
    });
    const [backgroundImg, backgroundImgState] = useState();
    const [isDesktop, setDesktop] = useState(window.innerWidth);

    const updateMedia = () => {
        setDesktop(window.innerWidth);
    };
    

    const {data, loading, error} = useQuery(getMovieById, {
        variables: {id}
    })

   
    const convertToHours = (time) => {
        let hours = Math.floor(time/60);
        let min = time - hours*60;
        let result = hours.toString() + "h" + " " + min.toString() + "m"; 
        return result; 
    }

    const {data2, loading2, error2} = useQuery(getMovieSearchName, {
        variables: {id},
    });
    

    useEffect( () => {

    let mounted = true; 
    if(mounted){
        window.addEventListener("resize", updateMedia);
        let data = null;
        console.log(isDesktop)
        if(isDesktop > 800){
            console.log("first condition")
             data = async () => {
                await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=0aecc06bb4fadb06b5f071fef0c2ce6d&&language=en-US&append_to_response=videos%2Cimages&include_image_language=en%2Cnull&fbclid=IwAR0YGcvMYcFf8ieH8yGGDQZuxZ159CdSyQ_YXMqvPgamKd0jPSjWlZELaEg`
                ).then(result => {
                    
                    console.log("hello world")     
                
                    senditemState({movies: result.data});
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
        
        }

        else if(isDesktop < 600){

            data = async () => {
                console.log("second condition")
                await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=0aecc06bb4fadb06b5f071fef0c2ce6d&&language=en-US&append_to_response=videos%2Cimages&include_image_language=en%2Cnull&fbclid=IwAR0YGcvMYcFf8ieH8yGGDQZuxZ159CdSyQ_YXMqvPgamKd0jPSjWlZELaEg`
                ).then(result => {
                    
                    console.log("hello world")     
                
                    senditemState({movies: result.data});
                    console.log(senditem);
                    backgroundImgState({
                        background: `linear-gradient(rgba(0, 0, 0, 0), 
                        rgba(0, 0, 0, 0) 20%, 
                        rgba(44, 57, 73, 0.8) 30%, 
                        rgb(44, 57, 73) 40%, 
                        rgba(44, 57, 73, 0.99) 50%) 0% 0% / cover, 
                        url(https://image.tmdb.org/t/p/w300${result.data.backdrop_path})
                        top
                        center
                        no-repeat`,
                        backgroundSize: '100% auto'
                        
                                        
                    })
                }).catch(err => {
                    console.log(err);
                })
            }

        }

        else{
             data = async () => {
                console.log("second condition")
                await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=0aecc06bb4fadb06b5f071fef0c2ce6d&&language=en-US&append_to_response=videos%2Cimages&include_image_language=en%2Cnull&fbclid=IwAR0YGcvMYcFf8ieH8yGGDQZuxZ159CdSyQ_YXMqvPgamKd0jPSjWlZELaEg`
                ).then(result => {
                    
                    console.log("hello world")     
                
                    senditemState({movies: result.data});
                    console.log(senditem);
                    backgroundImgState({
                        background: `linear-gradient(rgba(0, 0, 0, 0), 
                        rgba(0, 0, 0, 0) 40%, 
                        rgba(44, 57, 73, 0.8) 50%, 
                        rgb(44, 57, 73) 60%, 
                        rgba(44, 57, 73, 0.99) 70%) 0% 0% / cover, 
                        url(https://image.tmdb.org/t/p/w300${result.data.backdrop_path})
                        top
                        center
                        no-repeat`,
                        backgroundSize: '100% auto'
                        
                                        
                    })
                }).catch(err => {
                    console.log(err);
                })
            }
        }
        data();
    }
        return () => mounted = false; 
    }, [isDesktop]);


    const MovieItemConditionally = () => {
        return(
            <React.Fragment>
               
                <div style={backgroundImg} className="container-condition">
                    <div>   
                        <button onClick={history.goBack} className="button-condition"><LeftOutlined /></button>
                    </div>
                    <div className="item-container-condition">
                        <h1 className="item-title-condition">{senditem.movies.title}</h1>
                        <h3 className="item-tagline-condition">{senditem.movies.tagline}</h3>
                        <div className="item-genres-condition">
                            {senditem.movies.genres.map((item, index) => {
                                return(
                                    <div className="item-genres-generator">
                                        {index == senditem.movies.genres.length - 1 ?
                                            (
                                                <p>{item.name}</p>
                                            )
                                        
                                            :
                                            (
                                                <p>{item.name} </p>
                                            )
                                        }
                                    </div>
                                )
                            })}
                        </div>
                        <div className="item-time-star-condition">
                            <div className="time-condition">
                                <p><ClockCircleFilled /></p>
                                <p>{convertToHours(senditem.movies.runtime)}</p>
                            </div>
                            <div className="star-condition">
                                <p><StarFilled /></p>
                                <p>{senditem.movies.vote_average}</p>
                            </div>
                        </div>
                        <div className="item-footer-condition">
                            <div className="item-overview-condition">
                                <div>
                                    <p>
                                        {senditem.movies.overview}
                                    </p>
                                </div>
                            </div>

                            <div className="revenue-budget-condition">
                                 <div>
                                    
                                    <p>Revenue: ${senditem.movies.revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                                </div>
        
                                <div>
                                    
                                    <p>Budget: ${senditem.movies.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                            </div>
            
                        </div>

                            
                        </div>
                        
                        

                    </div>
                    
                    <div className="button-option-condition">
                            <button className="button1-condition" ><a href={`https://www.youtube.com/watch?v=${senditem.movies.videos.results[0].key}`} target="_blank" >Watch Trailer</a></button>
                            <button className="button2-condition" onClick={() => props.addMovie(senditem.movies)} >Add To List</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
    


    if(loading){
        return(
            <React.Fragment>
                <div className="loading-mode">
                    <LoadingOutlined className="spin" size="large" />
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
        <React.Fragment  >
                {console.log("data2")}
               
                {!senditem  ?  (
                    <h1>hihih</h1>
                ) : ( 
                <>
                    {isDesktop > 800 ? (
                        <div style={backgroundImg} className="container">

                    
                        <div>

                            <button onClick={history.goBack}  className="button-back">Back</button>
                        
                        </div>

                         <div  className="item-container">

                            <div className="item-left">

                               
                                <div className="item-left-movie" >
                                    <div className="item-left-img" >
                                        <img 
                                            alt="example" 
                                            src={`https://image.tmdb.org/t/p/w300${senditem.movies.poster_path}`} />
                                    </div>
                                </div>
                                
                                
                                
            
                                <div className="item-left-overview">
                                    <p>{senditem.tagline}</p>
                                </div>
            
                                <div className="item-left-button">
                                
                                    <button className="button1" ><a href={`https://www.youtube.com/watch?v=${senditem.movies.videos.results[0].key}`} target="_blank" >Watch Trailer</a></button>
                                    <button className="button2" onClick={() => props.addMovie(senditem.movies)} >Add To List</button>
            
                                </div>
            
                            </div>
                            
                            {/* the first component */}
    
    
                            <div className="item-middle">
                                
            
                                <div className="item-middle-genres">
                                    <h1 className="item-middle-genres-title">{senditem.movies.title}</h1>
                                    <div className="item-middle-genres-list">
                                    {senditem.movies.genres.map((item, index) => {
                                        if(index == senditem.movies.genres.length - 1){
                                            return(
                                                <p>{item.name}</p>
                                            )
                                        }
                                        else{
                                            return(
                                                <p>{item.name }<span>, </span></p>
                                        )
                                        }
                                    })}
                                    </div>

                                    <div className="item-middle-genres-time-vote">
                                            <div className="time">
                                                <p><ClockCircleFilled /></p>
                                                <p>{convertToHours(senditem.movies.runtime)}</p>
                                            </div>
                                            <div className="star">
                                                <p><StarFilled /></p>
                                                <p>{senditem.movies.vote_average}</p>
                                            </div>
                                    </div>
                                </div>
            
                                
                                <div className="item-middle-overview">
                                    
                                    <h2>Overview</h2>
                                    
                                    <div>
                                        {senditem.movies.overview}
                                    </div>
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
                    </div>
                    ) : (
                        <MovieItemConditionally />
                    )}
                
                </>
                )}
           
                
            
            
        </React.Fragment>
    )
}


export default withRouter(MovieItem); 