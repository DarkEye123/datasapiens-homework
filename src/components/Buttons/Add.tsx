import React from 'react';
import { styled, Theme, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const AddButton = styled((props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  return (
    <Fab
      color="primary"
      aria-label="add entry"
      size={matches ? 'large' : 'small'}
      {...props}
    >
      <AddIcon />
    </Fab>
  );
})(({ theme }: { theme: Theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  zIndex: theme.zIndex.mobileStepper,
}));

export default AddButton;
