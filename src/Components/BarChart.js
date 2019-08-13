import React from "react";
import PropTypes from 'prop-types'
import {
  BarChart,
  Bar,
  Brush,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

class BarChartExtended extends React.PureComponent {
  render() {
    return (
      <BarChart
        width={600}
        height={300}
        data={this.props.data}
        style={styles.barChart}
        margin={styles.barChartMargin}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          height={45}
          label={{ value: this.props.xLabel, position: 'insideBottom', }}
        />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign="top" wrapperStyle={styles.barChartLegend} />
        <ReferenceLine y={0} stroke='#000' />
        <Brush dataKey='name' height={30} stroke={this.props.barColor} />
        <Bar dataKey="Stands quantity" fill={this.props.barColor} />
      </BarChart>
    );
  }
}

const styles = {
  barChart: { margin: '0 auto' },
  barChartMargin: { top: 5, right: 30, left: 20, bottom: 5 },
  barChartLegend: { lineHeight: '40px' },
}

BarChartExtended.propTypes = {
  xLabel: PropTypes.string.isRequired,
  barColor: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
}

export default BarChartExtended;