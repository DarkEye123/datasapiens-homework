import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }),
);

interface Label {
  text: string;
  isOptional: boolean;
  completed: boolean;
}

type Props = {
  labels: Label[];
  activeIndex: number;
};

export default function ManagedStepper({ labels, activeIndex }: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeIndex}>
        {labels.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: { optional?: React.ReactNode } = {};
          if (label.isOptional) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          stepProps.completed = label.completed;
          return (
            <Step key={label.text} {...stepProps}>
              <StepLabel {...labelProps}>{label.text}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
}

export type { Label as StepperLabel };
