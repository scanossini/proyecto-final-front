import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import { Pagination } from '../components/Pagination/Pagination'
import { Posts } from '../components/Posts/Posts'


export const Donantes = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  //obtener posts actuales
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  //cambiar de pagina
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Grid
      container
      spacing={0}
      alignItems="center"
      justify="center"
    >
      <Grid item className="text-primary mt-3" xs={12}><h1>Donantes</h1></Grid>
      <Grid item xs={9}><Posts posts={currentPosts} loading={loading} /></Grid>
      <Grid item xs={3}>asd</Grid>
      <Grid item xs={12}>
        <Pagination 
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
        />
      </Grid>
    </Grid>
  );
}

