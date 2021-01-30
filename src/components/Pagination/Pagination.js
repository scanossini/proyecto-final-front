import React from 'react'
import Button from '@material-ui/core/Button';
import './Pagination.css';

export const Pagination = ({postsPerPage, totalPosts, paginate}) => {
  const pageNumbers = [];

  for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>  
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li className="buttons" key={number} >
            <Button size={'medium'} onClick={() => paginate(number)} >
              {number}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
