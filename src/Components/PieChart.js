import React from 'react';
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
} from 'recharts';
import PropTypes from 'prop-types'

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
class PieChartCC extends React.PureComponent {
  render() {
    return (
        <PieChart
          width={300}
          height={300}
        >
          <Pie
            data={this.props.data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="30%"
            innerRadius={40}
            outerRadius={80}
            fill="#82ca9d"
          >
            {
              this.props.data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index]}
                />
              ))
            }
          </Pie>
          <Tooltip />
        </PieChart>
    );
  }
}

PieChartCC.propTypes = {
  data: PropTypes.array.isRequired,
}

export default PieChartCC;
