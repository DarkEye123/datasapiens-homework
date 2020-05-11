import React, { FC } from 'react';
import {
  Typography,
  Grid,
  makeStyles,
  createStyles,
  Divider,
} from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { DonutGraphCategory } from '../../../types/budget';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '150px',
      [theme.breakpoints.up('sm')]: {
        width: '300px',
      },
    },
    square: {
      color: (props: { color: string }) => props.color,
      fontSize: '1.2rem',
    },
    icon: {
      fontSize: '16px',
      [theme.breakpoints.up('sm')]: {
        fontSize: '32px',
      },
    },
    typography: {
      fontSize: '10px',
      [theme.breakpoints.up('sm')]: {
        fontSize: theme.typography.fontSize,
      },
    },
  }),
);

const Tooltip: FC<DonutGraphCategory & { color: string }> = ({
  id,
  value,
  color,
}) => {
  const classes = useStyles({ color });
  return (
    <Grid container className={classes.root}>
      <Grid item xs={2} container justify="center" alignContent="center">
        <InfoOutlinedIcon className={classes.icon}></InfoOutlinedIcon>
      </Grid>
      <Grid item xs={10}>
        <Typography
          variant="caption"
          display="block"
          className={classes.typography}
          gutterBottom
        >
          to select category double click on graph area
        </Typography>
        <Divider></Divider>
        <Typography
          variant="caption"
          display="block"
          className={classes.typography}
          gutterBottom
        >
          <span className={classes.square}>■</span>
          {id}:<b>{value}</b>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Tooltip;
