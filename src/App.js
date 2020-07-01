import React from 'react';
import PopularMovie from './components/popularMovie';
import InputSearch from './components/inputSearch';
import Favor from './components/favor';
import { ApolloProvider } from 'react-apollo';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {appMovieAdd, appMovieDelete} from './actions/action';
import {listWorkReselect} from './reselect/reselect';
import client from './apollo/client';
import MovieItem from './components/movieItem';
import NavBar from './components/navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter,
  matchPath,
  withRouter
} from "react-router-dom";
import './App.css';


      


class App extends React.Component{

  constructor(props){
      super(props);
      this.state = {
        isNavBarHidden: false, 
        pathlink: window.location.pathname,
        popularState: {
          background: 'rgb(124, 165, 121)',
        },
        searchState: {}, 
        favorState: {},

      }
  }

  onClickButton = () => {
    this.setState({
      pathlink: window.location.pathname,
    })
  }

  

  
  

  render(){
    return(
      <React.Fragment>

          <ApolloProvider client={client}>
           
           
            <Router className="root">
              <div>
               
                {console.log(this.state.pathlink + " pathlink")}
                { this.state.pathlink === '/popularmovie/:id' ? null : (

                  <nav className="navbar">
                  <ul>
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
                      })
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
                            }
                          })
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
                          })
                    }}>
                      <Link to="/favor">
                        <p>Favorites</p>
                        <div style={this.state.favorState}></div>
                      </Link>
                    </li>
                  </ul>
                  </nav>
                ) }

                {/* A <Switch> looks through its children <Route>s and
                    renders the first one that matches the current URL. */}
                <Switch>

                   
                    <Route exact path="/popularmovie" >
                        <PopularMovie onClick={() => this.onClickButton()} />
                    </Route>

                    <Route exact path="/" >
                        <PopularMovie onClick={() => this.onClickButton()} />
                    </Route>
                    <Route  path="/popularmovie/:id" >
                      
                        <MovieItem onClick={() => this.onClickButton()}  addMovie={this.props.add}/>
                    </Route>   
                    <Route  path="/search" >
                        <InputSearch onClick={() => this.onClickButton()}/>
                    </Route>
                    <Route  path="/favor" >
                        <Favor onClick={() => this.onClickButton()} work={this.props.listWork}/>
                    </Route>
                </Switch>
              </div>
          </Router>
         
        </ApolloProvider>
        
    </React.Fragment >
    )
  }
}


const checkPath = matchPath('http://localhost:3000/popularmovie/419704', {
  path: "http://localhost:3000/popularmovie/:id",
  exact: false,
  strict: false
})

const stateChange = () => {
  this.setState({
    isNavBarHidden: true, 
  })

  console.log("workes")
}


const mapStateToProps = createStructuredSelector({
  listWork: listWorkReselect
});


const mapDispatchToProps = dispatch => ({
  add: item => dispatch(appMovieAdd(item)),
  delete: id => dispatch(appMovieDelete(id)),
})

export default connect(mapStateToProps,mapDispatchToProps)(App);



