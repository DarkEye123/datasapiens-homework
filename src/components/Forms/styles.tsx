import { styled, Grid as MGrid, Theme, GridProps } from '@material-ui/core';

import React from 'react';
const Grid = styled((props: GridProps) => {
  console.log(props);
  return <MGrid {...props}></MGrid>;
})(({ theme }: { theme: Theme }) => ({
  // display: 'flex',
  // position: 'relative',
  '& > button': {
    position: 'fixed',
    bottom: theme.spacing(2),
  },
}));

const Actions = styled('div')(({ theme }: { theme: Theme }) => ({
  display: 'inline-flex',
  position: 'absolute',
  bottom: theme.spacing(1),
  '& > button': {
    margin: theme.spacing(1),
  },
}));

export { Grid, Actions };
