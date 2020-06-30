import { createSelector } from 'reselect';

// lay ra state tong
const rootReselct = state => state.MovieReducer

// lay sate count (state con)
export const listWorkReselect = createSelector(
    rootReselct,
    item => item.movieList 
);


export const listWorkReselectID = createSelector(
    rootReselct,
    item => item.movieList
);

