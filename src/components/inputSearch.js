import React, {useState, useEffect, useRef} from 'react'
import {useLazyQuery} from '@apollo/react-hooks'
import {getMovieByName, getMovieSearchByName} from '../schema/schema'; 
import { Input, Card } from 'antd';
import {SearchOutlined, StarFilled, ClockCircleFilled} from '@ant-design/icons'
import './inputSearch.css';
import './popularMovie.css';
import axios from 'axios'
import {Link} from 'react-router-dom';
import {Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const { Meta } = Card;
const { Search } = Input;

const InputSearch = () => {
    let [getMovieBasedOnName, {data, loading, error}] = useLazyQuery(getMovieSearchByName, {
        fetchPolicy: "no-cache"
    });
    const [keyword, keywordState] = useState(null);
    
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
        let mount = true; 
        if(mount){
            window.addEventListener("resize", updateMedia);
            getMovieBasedOnName({variables: {name: keyword}});
            console.log(data);
        }
        return () => mount = false; 
        
    }, [keyword, isDesktop])


    if(loading){
        return(
        <React.Fragment>
             <div className="loading-mode">
                <LoadingOutlined className="spin" size="large"/>
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
           
            

            <div onClick={() => {
                    
                    movieInputState({
                        width: '10%'
                    })} 
                }
                className="input-container" >

                <form id="submitform">
                    <input  
                            className="input-search" 
                            type="text"    
                            name="inputsearch"
                            placeholder="...Search"
                            autoComplete="off"
                            onKeyDown={(event) => {
                                console.log(event.keyCode)
                                if(event.keyCode == '13'){
                                    console.log(event.keyCode);
                                    console.log('go');
                                    keywordState(document.querySelector('.input-search').value)
                                }
                            }}
                            style={ isDesktop < 700 ? {width: '25%'} : movieInput}
                            onClick={(event) => {
                                event.stopPropagation();
                                
                                
                                }
                            }

                    />

                    

                    <button className="input-submit"
                           onClick={() => keywordState(document.querySelector('.input-search').value)} 
                            > <SearchOutlined /> </button> 

                </form>

                
                <div className="movieList" >
                   

                    {
                        keyword != null ? (
                            data.movieItem.map((item, index) => ( 
                                <div className="movieItem">
                                       <Link
                                            to={{
                                                pathname: `/popularmovie/${item.id}`,
                                            }}
                                       >

                                        <img 
                                                className="imgItem"
                                                alt="example" 
                                                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} />
                                                
                                        <div className="movieItem-start">
                                            <StarFilled className="starfilled"/>
                                            {item.vote_average}
                                                    
                                        </div>
                                        {/* <div className="movieItem-time">
                                            <ClockCircleFilled/>
                                            <p>{item.runtime}</p>
                                        </div> */}

                                    </Link>
                                        
                                </div>

                            )
                            )
                        ) : (
                            <h1 className="search-result">No results yet</h1>
                        )
                    } 
                </div> 
            </div>
           
        </React.Fragment>
    )
}


export default InputSearch;