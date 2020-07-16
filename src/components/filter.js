import React from 'react'


const categoryArr = [
    ['Action', '28'],
    ['Adventure', '12'],
    ['Science Fiction', '878'],
    ['War', '10752'],
    ['History', '36'],
    ['Comedy', '35'],
    ['Mystery', '9648'],
    ['Family', '10751'],
    ['History', '36'],
    ['Crime', '80'],
    ['Thriller', '53'],
    ['All', '-1'],
  
    
];

class Filter extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          sortBy: '',
          isNavBarHidden: false, 
          pathlink: window.location.pathname,
          popularState: {
            background: 'rgb(124, 165, 121)',
          },
          filterState:{
             visibility: 'hidden'
            },

            categoryState:{
                visibility: 'hidden',
            },
          searchState: {}, 
          favorState: {},
  
        }
    }


    render(){
        return(
            <>

                <ul className="filter">
                     
                     <li 
                            
                             //style={this.state.filterState}
                             onMouseEnter={() => this.setState({
                               filterState:{
                                 visibility:'visible',
                                 transitionDuration: '1s',
                               }
                             })} 

                             
                             onMouseLeave={() => this.setState({
                               filterState:{
                                 visibility:'hidden'
                               }
                             })} 
                             className="filter-item-container">


                         <div 
                         onClick={() => {
                            if(this.state.filterState.visibility === 'visible'){
                              this.setState({
                                filterState: {
                                  visibility: 'hidden',
                                }
                              })
                            }
                            else if(this.state.filterState.visibility === 'hidden'){
                              this.setState({
                                filterState:{
                                  visibility: 'visibility',
                                 
                                }
                              })
                            }
                          }}
                         className="filter-list">
                          
                             <p  >Sortby</p>
                           


                           
                         
                             <div style={this.state.filterState} 
                             className="filter-item">
                               <div className="filter-item-wrapper">
                                 <div  onClick={() => this.props.changeProps()} >
                                   Rating
                                 </div>
                             
                               </div>
                               
                             </div>
                           
                         </div>
                     </li>

                     {/* category */}

                     <li 
                         onMouseEnter={() => this.setState({
                            categoryState:{
                              visibility:'visible',
                             
                            }
                          })} 

                          
                          onMouseLeave={() => this.setState({
                            categoryState:{
                              visibility:'hidden'
                            }
                          })} 
                         className="filter-item-container">
                         <div 
                         onClick={() => {
                            if(this.state.categoryState.visibility === 'visible'){
                              this.setState({
                                categoryState: {
                                  visibility: 'hidden',
                                }
                              })
                            }
                            else if(this.state.categoryState.visibility === 'hidden'){
                              this.setState({
                                categoryState:{
                                  visibility: 'visibility',
                                 
                                }
                              })
                            }
                          }}
                         className="filter-list">
                          
                             <p  >Category</p>
                           


                           
                         
                             <div style={this.state.categoryState} 
                             className="category-item">
                               <div className="category-item-wrapper">

                                   {categoryArr.map((item) => (
                                       <>
                                            <div onClick={() => this.props.getCategory(item)} className="category-elem">
                                                {item[0]}
                                            </div>
                                       </>
                                   ))}
                                 
                             
                               </div>
                               
                             </div>
                           
                         </div>
                     </li>
                 
               </ul>
            </>
        )
    }
}


export default Filter;