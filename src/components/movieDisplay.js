import React from 'react'
import {ClockCircleFilled,StarFilled} from '@ant-design/icons';
import {Link} from "react-router-dom";

const MovieDisplay = ({data, type}) => {

    console.log(type);

    if(type == 'rating'){
        for(var i = 0 ; i < data.length ; i++){
            for(var j = i+ 1 ; j < data.length ; j++){
                if(data[i].vote_average < data[j].vote_average){
                    let tmp = data[i]; 
                    data[i] = data[j]; 
                    data[j] = tmp; 
                }
            }
        }
    }
    return(
        <>
            <div className="movieContainer">
                
                <div className="movieList">
                    {
                        
                        data.map((item, index) => (
                             
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
        </>
    )
}


export default MovieDisplay;