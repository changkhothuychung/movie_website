import React from 'react'




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
                                 visibility:'visible'
                               }
                             })} 

                             
                             onMouseLeave={() => this.setState({
                               filterState:{
                                 visibility:'hidden'
                               }
                             })} 
                             className="filter-item-container">
                         <div className="filter-list">
                          
                             <p  onClick={() => {
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
                             }}>Sortby</p>
                           


                           
                         
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

                     <li className="filter-item-container">
                         <p>Category</p>
                         <div></div>
                     </li>
                 
               </ul>
            </>
        )
    }
}


export default Filter;