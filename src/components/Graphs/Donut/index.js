import React, { useState, useEffect } from 'react';
import { ResponsivePie } from '@nivo/pie';
import { GraphWrapper } from '../styles';
import Tooltip from './tooltip';

const MyResponsivePie = ({ onOpen, data, selected = null }) => {
  const [category, setCategory] = useState(selected);
  const [tempCategory, setTempCategory] = useState(null);

  useEffect(() => {
    setCategory(selected);
  }, [selected]);

  const handleDoubleClick = (() => {
    let click = 0;
    return (data) => {
      click++;
      if (click >= 2) {
        click = 0;
        setCategory(data);
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
        radialLabelsLinkOffset={20}
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
              const id = tempCategory ? tempCategory.id : category.id;
              const isMatch = c.data.id === id;
              !isMatch && c.fill && delete c.fill;
              return isMatch;
            },
            id: 'dots',
          },
        ]}
        onMouseEnter={(c) => setTempCategory(c)}
        onMouseLeave={() => setTempCategory(null)}
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
