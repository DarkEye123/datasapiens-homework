import { ResponsiveBar } from '@nivo/bar';
import React from 'react';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const data = [
  {
    category: 'Food',
    value: 1105,
  },
  {
    category: 'auto',
    value: 25000,
  },
];

const MyResponsiveBar = () => (
  <ResponsiveBar
    data={data}
    indexBy="category"
    hei
    margin={{ top: 50, right: 130, bottom: 200, left: 60 }}
    padding={0.3}
    enableGridY={false}
    enableGridX={true}
    colors={{ scheme: 'nivo' }}
    axisTop={{
      tickSize: 0,
      tickPadding: 12,
    }}
    axisBottom={{
      legend: 'CATEGORIES',
      legendPosition: 'middle',
      legendOffset: 50,
      tickSize: 0,
      tickPadding: 12,
    }}
    axisLeft={null}
    markers={[
      {
        axis: 'y',
        value: 0,
        lineStyle: { strokeOpacity: 0 },
        textStyle: { fill: '#2ebca6' },
        legend: 'gain',
        legendPosition: 'top-left',
        legendOrientation: 'vertical',
        legendOffsetY: 120,
      },
      {
        axis: 'y',
        value: 0,
        lineStyle: { stroke: '#f47560', strokeWidth: 1 },
        textStyle: { fill: '#e25c3b' },
        legend: 'loss',
        legendPosition: 'bottom-left',
        legendOrientation: 'vertical',
        legendOffsetY: 120,
      },
    ]}
    animate={true}
    motionStiffness={90}
    motionDamping={15}
  />
);

export default MyResponsiveBar;
