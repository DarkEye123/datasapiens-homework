import React from 'react';
import { styled, Theme, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const AddButton = styled((props) => (
  <Fab color="primary" aria-label="add entry" {...props}>
    <AddIcon />
  </Fab>
))(({ theme }: { theme: Theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  zIndex: theme.zIndex.mobileStepper,
}));

export default AddButton;
