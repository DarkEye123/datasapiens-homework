import React from 'react';
import { Theme, styled } from '@material-ui/core/styles';
import Button, { ButtonProps } from '@material-ui/core/Button';

const Lang = styled('div')({
  position: 'absolute',
  display: 'flex',
  top: '110%',
  right: 0,
});

interface OmitProps {
  active: boolean;
}

const LangButton = styled(({ active, ...others }: OmitProps & ButtonProps) => (
  <Button {...others}></Button>
))(({ active, theme }: { theme: Theme } & OmitProps) => ({
  color: active ? theme.palette.primary.main : 'grey',
}));

const NavBar = styled('nav')(({ theme }: { theme: Theme }) => ({
  flexGrow: 1,
  display: 'flex',
  '& a': {
    display: 'flex',
    alignSelf: 'center',
    color: 'white',
    textDecoration: 'none',
  },
  '& .padded': {
    marginLeft: theme.spacing(2),
  },
  '& .selected': {
    fontWeight: 'bolder',
  },
  '& .logout': {
    color: 'white',
    margin: '0 0 0 auto',
  },
}));

export { LangButton, Lang, NavBar };
