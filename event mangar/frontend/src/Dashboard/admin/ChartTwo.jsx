import React, { PureComponent } from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: '18-24', uv: 31.47, pv: 2400, fill: '#8884d8' },
  { name: '25-29', uv: 26.69, pv: 4567, fill: '#83a6ed' },
  { name: '30-34', uv: 15.69, pv: 1398, fill: '#8dd1e1' },
  { name: '35-39', uv: 8.22, pv: 9800, fill: '#82ca9d' },
  { name: '40-49', uv: 8.63, pv: 3908, fill: '#a4de6c' },
  { name: '50+', uv: 2.63, pv: 4800, fill: '#d0ed57' },
  { name: 'unknow', uv: 6.67, pv: 4800, fill: '#ffc658' },
];

const legendStyle = {
  top: '50%',
  right: 0,
  transform: 'translate(0, -50%)',
  lineHeight: '24px',
  position: 'absolute',
};

export default class Example extends PureComponent {
  render() {
    return (
      <div
        style={{
          width: '100%',
          maxWidth: '500px',
          height: '350px',
          position: 'relative',
          margin: 'auto',
          background: '#f9f9f9',
          borderRadius: '12px',
          padding: '16px',
          boxShadow: '0 0 12px rgba(0,0,0,0.1)',
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="10%"
            outerRadius="80%"
            barSize={12}
            data={data}
          >
            <RadialBar
              minAngle={15}
              label={{ position: 'insideStart', fill: '#fff' }}
              background
              clockWise
              dataKey="uv"
            />
            <Legend
              iconSize={10}
              layout="vertical"
              verticalAlign="middle"
              wrapperStyle={legendStyle}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
