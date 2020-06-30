import * as R from 'ramda'; 
import {MOVIEADD, MOVIEDELETE} from '../actions/const'; 


const stateDefault = {
    movieList: [],
}


const MovieReducer = (state = stateDefault, action) => {
    switch(action.type){
        case MOVIEADD: 
            return {
                movieList: [...state.movieList, action.item]
            }

        case MOVIEDELETE: 
            return {
                movieList: R.filter(item => item.id !== action.id, state.movieList)
            }

        default: 
            return state; 

    }
}

export default MovieReducer; 

