import React from 'react'
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';

import { useFirebaseBtnStyles } from '@mui-treasury/styles/button/firebase';
import { usePushingGutterStyles } from '@mui-treasury/styles/gutter/pushing';


export const Posts = ({posts, loading}) => { 
  const styles = useFirebaseBtnStyles();
  const gutterStyles = usePushingGutterStyles();

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
          <Grid item xs={3}>
            <div className={gutterStyles.parent}>
              <Button classes={styles} variant={'contained'} color={'primary'}>
                Editar
              </Button>
            </div>
          </Grid>
        </Grid>
      ))}
    </ul>
  )
}
