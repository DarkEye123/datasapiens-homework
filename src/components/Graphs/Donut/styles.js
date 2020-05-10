import { styled } from '@material-ui/core/styles';

const GraphWrapper = styled('div')({
  height: 400,
  '& path[fill*="url"]': {
    strokeWidth: 3,
    // transform: 'scale(1.1)',
    transition: 'all 0.3s',
  },
  '& path': {
    transition: 'all 0.3s',
  },
});

export { GraphWrapper };
