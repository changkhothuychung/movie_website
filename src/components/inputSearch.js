import React, {useState, useEffect} from 'react'
import {useLazyQuery} from '@apollo/react-hooks'
import {getMovieByName} from '../schema/schema'; 
import { Input, Card } from 'antd';
import {SearchOutlined} from '@ant-design/icons'
import './inputSearch.css';
import './popularMovie.css';
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

    
    useEffect(() => {
        getMovieBasedOnName({variables: {name: keyword}});

    }, [keyword])


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

            <div onClick={() => {
                    
                    movieInputState({
                        width: '10%'
                    })} 
                 }
                className="input-container" >

                
                {console.log(data)}
                <form>

                    <input  

                            className="input-search" 
                            type="text"    
                            name="inputsearch"
                            defaultValue={keyword}
                            placeholder="...Search"
                            style={movieInput}
                            onClick={(event) => {
                                event.stopPropagation();
                                    movieInputState({
                                    width: '20%'
                                })}
                            }

                            onMouseUp= {() => movieInputState({
                                width: '10%'
                            })}
                            
                    />

                    <button className="input-submit"
                           onClick={() => keywordState(document.querySelector('.input-search').value)} 
                           type="submit" ><SearchOutlined /> </button>

                </form>

                


                {
                    data != null ? (


                        data.search.map((item, index) => (
                            
                            
                            <Link to={`/popularmovie/${item.id}`}>
                                <div className="movieItem" >
                                    <div className="imgItem" >
                                        <img 
                                                alt="example" 
                                                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} />
                                    </div>
                                </div>
                            </Link>
                        )
        
                        )

                    ) : (
                        <h1>hihi</h1>
                    )
                }

            </div>

        </React.Fragment>
    )


}


export default InputSearch;