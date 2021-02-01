import React from 'react'
import Button from '@material-ui/core/Button';
import './Pagination.css';  
import Grid from "@material-ui/core/Grid";

export const Pagination = ({postsPerPage, totalPosts, paginate}) => {
  const pageNumbers = [];

  for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav> 
      <Grid
      container
      spacing={0}
      alignItems="center"
      justify="center"
      >
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li className="buttons" key={number} >
            <Button size={'medium'} onClick={() => paginate(number)} >
              {number}
            </Button>
          </li>
        ))}
      </ul>
      </Grid>
    </nav>
  )
}
