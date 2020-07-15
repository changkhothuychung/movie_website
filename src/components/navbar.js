import React from 'react'
import {Link} from 'react-router-dom';


class NavBar extends React.Component{



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
                <ul className="menu">
                        <li  onClick={() => {
                          this.setState({
                            popularState:{
                              background: 'rgb(124, 165, 121)'
                            }, 
                            searchState: {
                              background: 'black', 
                            },
                            favorState:{
                              background: 'black',
                            }
                          });
                          this.props.changeNavBarMovie();
                        }}>
                          <Link to="/popularmovie">
                            <p>Popular Movies</p>
                            <div style={this.state.popularState}></div>
                          </Link>
                        </li>
    
                        <li onClick={() => {
                              this.setState({
                                popularState:{
                                  background: 'black'
                                }, 
                                searchState: {
                                  background: 'rgb(124, 165, 121)', 
                                },
                                favorState:{
                                  background: 'black',
                                },
                                
                              });
                              this.props.changeNavBarSearch();
                        }}>
                          <Link to="/search">
                            <p>Search</p>
                            <div style={this.state.searchState}></div>
                          </Link>
                        </li>
    
    
                        <li onClick={() => {
                              this.setState({
                                popularState:{
                                  background: 'black'
                                }, 
                                searchState: {
                                  background: 'black', 
                                },
                                favorState:{
                                  background: 'rgb(124, 165, 121)',
                                }
                              });
                              this.props.changeNavBarSearch();
                        }}>
                          <Link to="/favor">
                            <p>Favorites</p>
                            <div style={this.state.favorState}></div>
                          </Link>
                        </li>
                      </ul>
            </>
        )

    }


   

}
    



export default NavBar;