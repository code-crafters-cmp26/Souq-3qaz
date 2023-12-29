import React, { useEffect } from 'react';
import { ChartComponent, SeriesDirective, SeriesCollectionDirective, BarSeries, Inject, Category} from '@syncfusion/ej2-react-charts';
import 'bootstrap/dist/css/bootstrap.min.css';

const HistogramChart = ({ data, labels }) => {
  const chartData = data.map((value, index) => ({ x: labels[index], y: value }));

  const primaryXAxis = { valueType: 'Category' };

  return (
    <div>
      <h2>Histogram</h2>
      <ChartComponent id='chart-container' primaryXAxis={primaryXAxis}>
        <Inject services={[BarSeries, Category]} />
        <SeriesCollectionDirective>
          <SeriesDirective dataSource={chartData} xName='x' yName='y' type='Bar' />
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
};

export default HistogramChart;
