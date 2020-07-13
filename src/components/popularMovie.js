import React, {useState} from 'react'
import { Card , Row, Col} from 'antd';
import {useQuery} from '@apollo/react-hooks';
import {getAllMovie} from '../schema/schema';
import {
    Link
} from "react-router-dom";
import './popularMovie.css';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {ClockCircleFilled,StarFilled} from '@ant-design/icons';


const PopularMovie = (props) => {

    const {data, loading, error} = useQuery(getAllMovie);
    const [senditem, senditemState] = useState(null);
    const [sizeChange, sizeChangeState] = useState({
        width:'240px',
        height: '360px',
    })
    const [flag, flagState] = useState(false);

    const convertToHours = (time) => {
        let hours = Math.floor(time/60);
        let min = time - hours*60;
        let result = hours.toString() + "h" + " " + min.toString() + "m"; 
        return result; 
    }
    
    const handleOnClick = (item) => {
        return <Link  to={{
            pathname: `/popularmovie/${item.id}`,
            
        }}>
        </Link>
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
                <h1>Error</h1>
            </React.Fragment>
        )
    }





   
    return(
        <React.Fragment>
            <div className="movieContainer">
                
                <div className="movieList">
                    {
                        
                        data.movie.map((item, index) => (
                             
                               <div className="movieItem">
                                        <Link  
                                            
                                            to={{
                                                pathname: `/popularmovie/${item.id}`,
                                                
                                            }}>

                                        
                                        
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
                                            
                                        </div> */}
                                       
                                        </Link>
                                
                                </div>
                                    
                                
                            )  
                        )  
                    }
                </div>

            </div>
            
        </React.Fragment>
    )
}


export default PopularMovie;
