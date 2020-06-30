import {gql} from 'apollo-boost'; 


export const getAllMovie = gql`
    query{
        movie{
            id
            title
            overview
            popularity
            release_date
            poster_path
            backdrop_path

        }
    }
`;


export const getMovieByName = gql`
    query($name: String){
        search(name: $name){
            id
            title
            overview
            popularity
            release_date
            poster_path
            backdrop_path
        }
    }
`;

export const getMovieById = gql`
    query($id: String){
        searchById(id: $id){
            id
            title
            overview
            popularity
            release_date
            poster_path
            backdrop_path
        }
    }
`