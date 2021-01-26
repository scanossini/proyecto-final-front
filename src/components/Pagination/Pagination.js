import React from 'react'
import Button from '@material-ui/core/Button';

export const Pagination = ({postsPerPage, totalPosts, paginate}) => {
  const pageNumbers = [];

  for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>  
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} style={{marginRight: '0.5%'}} className="btn btn-primary">
            <Button  onClick={() => paginate(number)} >
              {number}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
