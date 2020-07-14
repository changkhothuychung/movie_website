import React from 'react';
import './pagination.css';

const SelfMadePagination = ({postsPerPage, totalPosts, paginate}) => {
    let PageNumbers = []; 

    for(let i = 1 ; i <= Math.ceil(totalPosts/postsPerPage); i++){
        PageNumbers.push(i);
    }

    return(
        <>
            <nav>
                <ul className="paginate-list">
                    {PageNumbers.map( (number) => (
                        <li onClick={() => paginate(number)} key={number} className="paginate-item">
                            <p>{number}</p>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    )

}

export default SelfMadePagination; 