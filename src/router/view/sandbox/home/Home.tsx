import { Grid, Paper, styled } from '@mui/material'
import React from 'react'

const Home = () => {

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <Grid container spacing={2}>
      go home
    </Grid>
  )
}

export default Home