import React, { useState } from 'react';
import { ResponsivePie } from '@nivo/pie';
import { GraphWrapper } from './styles';
import Tooltip from './tooltip';

const MyResponsivePie = ({ onOpen, data }) => {
  const [category, setCategory] = useState({});

  const handleDoubleClick = (() => {
    let click = 0;
    return (data) => {
      click++;
      if (click >= 2) {
        click = 0;
        onOpen(data);
      } else {
        setTimeout(() => (click = 0), 350);
      }
    };
  })();

  return (
    <GraphWrapper>
      <ResponsivePie
        data={data}
        indexBy="category"
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={2}
        cornerRadius={5}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 2]] }}
        radialLabelsLinkStrokeWidth={3}
        radialLabelsLinkColor={{ from: 'color' }}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            size: 4,
            padding: 1,
            stagger: true,
          },
        ]}
        fill={[
          {
            match: (c) => {
              c.fill && delete c.fill;
              return c.data.id === category.id;
            },
            id: 'dots',
          },
        ]}
        onMouseEnter={(c) => setCategory(c)}
        onMouseLeave={() => setCategory({})}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        onClick={handleDoubleClick}
        tooltip={Tooltip}
      />
    </GraphWrapper>
  );
};
export default MyResponsivePie;
