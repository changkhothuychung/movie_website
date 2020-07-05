import React from 'react'
import { List, Typography , Checkbox} from 'antd';
import { Card } from 'antd';
import {Link } from 'react-router-dom';
import {DeleteFilled} from '@ant-design/icons'
import './favor.css';
const { Meta } = Card;
const { Text } = Typography;

export const Favor = (props) => {

    console.log("at favor")
    console.log(props.work);

    return(
        <React.Fragment>

        <div className="movieContainer">
                
                <div className="movieList">
                {
                    props.work.map((item) => (

                            <div className="movieItem">
                                    
                                    
                                    
                                        <img 
                                                className="imgItem"
                                                alt="example" 
                                                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} />
                                                
                                    

                                        <div onClick={(event) => {
                                            event.stopPropagation();
                                            props.deleteMovie(item)
                                            }} className="movieItem-start">
                                                    <DeleteFilled className="delete-icon"/>
                                                    
                                        </div>

                                        <div className="movieItem-detail">
                                            <Link  
                                                
                                                to={{
                                                    pathname: `/popularmovie/${item.id}`,
                                                    
                                                }}>
                                            <p>Details</p>
                                            </Link>
                                        </div>  

                                        
                            </div>
                        )
                        
                    )
                }
                </div>
        </div>
        
    </React.Fragment>
    )
}

export default Favor; 