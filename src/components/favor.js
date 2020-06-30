import React from 'react'
import { List, Typography , Checkbox} from 'antd';
import { Card } from 'antd';
import {Link } from 'react-router-dom';
const { Meta } = Card;
const { Text } = Typography;

export const Favor = (props) => {

    console.log("at favor")
    console.log(props.work);

    return(
        <React.Fragment>
        {
            props.work.map((item) => (

                    
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
                    
                )
                
            )
        }
        
    </React.Fragment>
    )
}

export default Favor; 