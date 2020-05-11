import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { GraphWrapper } from './styles';

const MyResponsiveBar = ({ legendLabel = 'CATEGORY', data }) => (
  <GraphWrapper height={800}>
    <ResponsiveBar
      data={data}
      indexBy="id"
      colorBy="id"
      keys={['total income', 'total expenses']}
      colors={(x) => (x.id === 'total income' ? '#97e3d5' : '#f47560')}
      margin={{ top: 200, right: 130, bottom: 200, left: 60 }}
      padding={0.3}
      enableGridX={true}
      label={(d) => Math.abs(d.value)}
      axisTop={{
        tickSize: 0,
        tickPadding: 12,
      }}
      axisBottom={{
        legend: legendLabel,
        legendPosition: 'middle',
        legendOffset: 50,
        tickSize: 0,
        tickPadding: 12,
      }}
      axisLeft={null}
      axisRight={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'CASH',
        format: (v) => `${Math.abs(v)} CZK`,
        legendPosition: 'middle',
        legendOffset: 120,
      }}
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
      tooltip={(x) => {
        let id =
          x.id === 'total expenses'
            ? 'transactionsExpenses'
            : 'transactionsIncome';
        return (
          <span>
            number of records: <b>{x.data[id]}</b>
          </span>
        );
      }}
    />
  </GraphWrapper>
);

export default MyResponsiveBar;
