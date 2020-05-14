import React from 'react';
import { ListItem } from '@material-ui/core';
import { styled, Theme } from '@material-ui/core/styles';

const StyledListItem = styled((props) => <ListItem {...props} />)(
  ({ theme }: { theme: Theme }) => ({
    '&:hover': {
      cursor: 'pointer',
      boxShadow: theme.shadows[1],
    },
    boxShadow: 'none',
    transition: 'box-shadow 0.3s',
  }),
);

export { StyledListItem };
