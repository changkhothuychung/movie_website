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
import { ConnectedRouter } from 'connected-react-router';
import Filter from './components/filter';
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
  onClickButton = () => {
    this.setState({
      pathlink: window.location.pathname,
    })
  }


  changeProps=()=>{
    this.setState({
      sortBy:'rating',
    })
  }

  changeNavBarSearch= ()=>{
    this.setState({
      isNavBarHidden: true, 
    })
  }


changeNavBarMovie=()=>{
  this.setState({
    isNavBarHidden: false, 
  })
}
  

  
  

  render(){
    return(
      <React.Fragment>

          <ApolloProvider client={client}>
           
           
          <Router className="root">
              <div>
               
                {console.log(this.state.pathlink + " pathlink")}
               

                  <nav className="navbar">
                    <NavBar changeNavBarSearch={this.changeNavBarSearch.bind(this)} 
                            changeNavBarMovie={this.changeNavBarMovie.bind(this)}
                    />
                    
                    
                    {this.state.isNavBarHidden === false ? (
                      <Filter changeProps={this.changeProps.bind(this)}/>
                    ) : null}
                  </nav>
                

                {/* A <Switch> looks through its children <Route>s and
                    renders the first one that matches the current URL. */}
                <Switch>

                   
                    <Route exact path="/popularmovie" >
                        <PopularMovie type={this.state.sortBy} onClick={() => this.onClickButton()} />
                    </Route>

                    <Route exact path="/" >
                        <PopularMovie type={this.state.sortBy} onClick={() => this.onClickButton()} />
                    </Route>
                    <Route  path="/popularmovie/:id" >
                      
                        <MovieItem onClick={() => this.onClickButton()}  addMovie={this.props.add}/>
                    </Route>   
                    <Route  path="/search" >
                     
                        <InputSearch />
                      
                    </Route>
                   
                    <Route  path="/favor" >
                        <Favor onClick={() => this.onClickButton()} deleteMovie={this.props.delete} work={this.props.listWork}/>
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
  delete: item => dispatch(appMovieDelete(item)),
})

export default connect(mapStateToProps,mapDispatchToProps)(App);



