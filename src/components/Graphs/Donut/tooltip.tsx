import React, { FC } from 'react';
import { Typography, Grid, makeStyles, createStyles } from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { DonutGraphCategory } from '../../../types/budget';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '300px',
    },
    square: {
      color: (props: { color: string }) => props.color,
      fontSize: '1.2rem',
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
        <InfoOutlinedIcon fontSize="large"></InfoOutlinedIcon>
      </Grid>
      <Grid item xs={10}>
        <Typography variant="caption" display="block" gutterBottom>
          to select category double click on graph area
        </Typography>
        <hr></hr>
        <Typography variant="caption" display="block" gutterBottom>
          <span className={classes.square}>■</span>
          {id}:<b>{value}</b>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Tooltip;
