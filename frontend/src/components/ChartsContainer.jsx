import Wrapper from '../assets/wrappers/ChartsContainer';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import BarChartComponent from './BarChartComp';
import AreaChartComponent from './AreaChartComp';

const ChartContainer = () => {
  const [barChart, setBarChart] = useState(true);
  const { monthlyApplications: data } = useSelector((store) => store.allJobs);

  console.log(data);

  return (
    <Wrapper>
      <h4>Monthly Application</h4>
      <button
        type="button"
        onClick={() => {
          setBarChart(!barChart);
        }}
      >
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {barChart ? (
        <BarChartComponent data={data} />
      ) : (
        <AreaChartComponent data={data} />
      )}
    </Wrapper>
  );
};

export default ChartContainer;
