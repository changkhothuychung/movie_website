import * as R from 'ramda'; 
import {MOVIEADD, MOVIEDELETE} from '../actions/const'; 


const stateDefault = {
    movieList: [],
}


const MovieReducer = (state = stateDefault, action) => {
    switch(action.type){
        case MOVIEADD: 
            let flag = false; 
            for (let i = 0 ; i < state.movieList.length ; i++){
                if(state.movieList[i].id === action.item.id){
                    flag = true;
                }
            }
            if(flag == false){
                return {
                    movieList: [...state.movieList, action.item]
                }
            }
            else{
                return {
                    movieList: [...state.movieList]
                }
            }

        case MOVIEDELETE: 
            return {
                movieList: R.filter(item => item.id !== action.item.id, state.movieList)
            }

        default: 
            return state; 

    }
}

export default MovieReducer; 

