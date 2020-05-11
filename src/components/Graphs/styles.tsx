import React from 'react';

import { styled } from '@material-ui/core/styles';

interface OmitProps {
  height: number;
}

const GraphWrapper = styled(({ height, ...other }: OmitProps) => (
  <div {...other}></div>
))(({ height = 400 }: OmitProps) => ({
  height,
  '& path[fill*="url"]': {
    strokeWidth: 3,
    transform: 'scale(1.1)',
    transition: 'all 0.3s',
  },
  '& path': {
    transition: 'all 0.3s',
  },
}));

export { GraphWrapper };
