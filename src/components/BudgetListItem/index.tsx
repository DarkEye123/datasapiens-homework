import React, { FC } from 'react';
import {
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import FolderSharedOutlinedIcon from '@material-ui/icons/FolderSharedOutlined';
import { StyledListItem } from './styles';

type Props = {
  isShared: boolean;
  name: string;
  onOpen: (id: number) => void;
};

const BudgetListItem: FC<Props> = ({ isShared, name, onOpen }) => {
  return (
    <StyledListItem onDoubleClick={onOpen}>
      <ListItemAvatar>
        <Avatar>
          {isShared ? <FolderSharedOutlinedIcon /> : <FolderIcon />}
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={name} secondary={isShared ? 'shared' : null} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </StyledListItem>
  );
};

export default BudgetListItem;
