import {MOVIEADD, MOVIEDELETE} from './const'; 


export const appMovieAdd = (item) => {
    return {
        type: MOVIEADD,
        item
    }
}

export const appMovieDelete = (item) => {

    return {
        type: MOVIEDELETE, 
        item
    }
}