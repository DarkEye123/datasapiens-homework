import React from 'react';
import {
  useTheme,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '150px',
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

type Props = {
  open: boolean;
  title: React.ReactNode;
  children?: React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
};

export default function SimpleDialog({
  open,
  title,
  children,
  onClose,
  onConfirm,
}: Props) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="dialog-title"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="dialog-title">{title}</DialogTitle>
      <DialogContent className={classes.root}>{children}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        {onConfirm && (
          <Button onClick={onConfirm} color="primary">
            Proceed
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
