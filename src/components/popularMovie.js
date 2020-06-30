import React, {useEffect, useState} from 'react'
import { Card , Row, Col} from 'antd';
import {useQuery} from '@apollo/react-hooks';
import {getAllMovie} from '../schema/schema';
import {
    Link
} from "react-router-dom";
import './popularMovie.css';
import { prop } from 'ramda';
import { Spin } from 'antd';



const PopularMovie = (props) => {

    const {data, loading, error} = useQuery(getAllMovie);
    const [senditem, senditemState] = useState(null);

    

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





    console.log("get data here");
    console.log(data.movie[0]); 

    return(
        <React.Fragment>
            <div className="movieContainer">
                <Row className="movieList">
                    {
                        data.movie.map((item) => (
                                <Col span={6} >
                                    <Link  
                                    
                                    to={{
                                        pathname: `/popularmovie/${item.id}`,
                                        
                                    }}>
                                        <div className="movieItem" >
                                            <div className="imgItem" >
                                                <img 
                                                     alt="example" 
                                                     src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} />
                                            </div>
                                        </div>
                                    </Link>
                                </Col>
                            )  
                        )  
                    }
                </Row>

            </div>
            
        </React.Fragment>
    )
}


export default PopularMovie;
