import React from 'react'
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import './Posts.css'

export const Posts = ({posts, loading}) => { 

  if(loading){
    return <h2>Loading...</h2>
  }

  return (
     <ul className="list-group mb-4">
      {posts.map( post => (
        <Grid container spacing={0}>
          <Grid item xs={9}>
            <li key={post.id} className="list-group-item">
              {post.title}           
            </li>
          </Grid>
          <Grid item xs={3} >
              <Button href={'/edit/' + post.id} className='botonEditar'>
                Editar
              </Button>
          </Grid>
        </Grid>
      ))}
    </ul>
  )
}
