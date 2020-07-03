import React, {useState, useEffect} from 'react'
import {useLazyQuery} from '@apollo/react-hooks'
import {getMovieByName} from '../schema/schema'; 
import { Input, Card } from 'antd';
import {SearchOutlined, StarFilled, ClockCircleFilled} from '@ant-design/icons'
import './inputSearch.css';
import './popularMovie.css';
import axios from 'axios'
import {Link} from 'react-router-dom';
import {Spin} from 'antd';

const { Meta } = Card;
const { Search } = Input;

const InputSearch = () => {
    let [getMovieBasedOnName, {data, loading, error}] = useLazyQuery(getMovieByName);
    const [keyword, keywordState] = useState('');
    
    let [movieInput, movieInputState] = useState({
        width: '10%'
    })

    const [senditem, senditemState] = useState({
        results: [],
    });

    const [isDesktop, setDesktop] = useState(window.innerWidth);

    const updateMedia = () => {
        setDesktop(window.innerWidth);
    }

    
    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        let mounted = true; 
        getMovieBasedOnName({variables: {name: keyword}});
        axios.get(`https://api.themoviedb.org/3/search/movie?query=${keyword}&api_key=cfe422613b250f702980a3bbf9e90716`)
        .then(result => {
            if(mounted){
                senditemState(result.data);
                console.log(result.data);
            }
            else{
                console.log('mounted');
            }
        }).catch(err => {
            console.log(err);
        })

        
            
       return () => mounted = false; 

    }, [keyword, isDesktop])


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
                <h1>Error</h1>
            </React.Fragment>
        )
    }


    const getDataInput = () => {
        let value = document.querySelector('.input-search').value;
        return value; 
    }



    return(
        <React.Fragment>
            {console.log("returning")}
            {console.log(senditem)}
            {console.log(isDesktop)}
            <div onClick={() => {
                    
                    movieInputState({
                        width: '10%'
                    })} 
                }
                className="input-container" >

                
                
                <form>

                    <input  

                            className="input-search" 
                            type="text"    
                            name="inputsearch"
                            placeholder="...Search"
                            style={ isDesktop < 700 ? {width: '25%'} : movieInput}
                            onClick={(event) => {
                                event.stopPropagation();
                                
                                if(isDesktop < 700){
                                    console.log("did update")
                                    movieInputState({
                                        width: '50%'
                                    })
                                }
                                else{
                                    console.log("did update1")
                                    movieInputState({
                                        width: '20%'
                                    })
                                }
                                   
                            
                                }
                            }

                            onMouseUp= {() => movieInputState({
                                width: '10%'
                            })}


                            
                    />

                    <button className="input-submit"
                           onClick={() => keywordState(document.querySelector('.input-search').value)} 
                           type="submit" ><SearchOutlined /> </button>

                </form>

                
                <div className="movieList" onClick={() => {
                                    movieInputState({
                                    width: '10%'
                                })}
                            }>

                    {
                        senditem != null ? (
                            senditem.results.map((item, index) => ( 
                                <div className="movieItem">
                                        
                                        
                                        
                                        <img 
                                                className="imgItem"
                                                alt="example" 
                                                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} />
                                                
                                       

                                        <div className="movieItem-start">
                                            <StarFilled className="starfilled"/>
                                            {item.vote_average}
                                                    
                                        </div>
                                        <div className="movieItem-time">
                                            <ClockCircleFilled/>
                                            <p>{item.runtime}</p>
                                        </div>
                                       
                                       
                                
                                </div>
                            )
                            )
                        ) : (
                            <h1>hihi</h1>
                        )
                    }
                </div>
            </div>
        </React.Fragment>
    )
}


export default InputSearch;