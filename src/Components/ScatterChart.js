import React from "react";
import PropTypes from 'prop-types'
import {
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  ZAxis,
  CartesianGrid, 
  Tooltip, 
  Legend
} from 'recharts';

const scatterZAxisRange = [20,40];

class ScatterChartCC extends React.PureComponent {
  render () {
  	return (
      <ScatterChart
        width={800}
        height={400}
        margin={styles.scatterChartMargin}
      >
      	<CartesianGrid />
        <XAxis
          type="number"
          dataKey="x"
          name="age"
          unit="yrs"
        />
      	<YAxis
          type="number"
          dataKey="y"
          name="volume"
          unit="m3"
        />
        <ZAxis 
          dataKey="z"
          range={scatterZAxisRange}
        />
      	<Tooltip cursor={styles.tooltip}/>
        <Legend />
      	<Scatter
          name="Wood volume distributed by age of trees"
          fill="#009900"
          shape="circle"
          data={this.props.data}
        />
      </ScatterChart>
    );
  }
}

const styles = {
  scatterChartMargin: {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
  },
  tooltip: {
    strokeDasharray: '3 3',
  }
}

ScatterChartCC.propTypes = {
  data: PropTypes.array.isRequired,
};

export default ScatterChartCC;
