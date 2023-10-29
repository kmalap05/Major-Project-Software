import React, { useEffect, useState } from 'react';
import GaugeComponent from 'react-gauge-component';
import axios from 'axios';

const PhGauge = () => {
  const [phValue, setPhValue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://environment-monitoring.onrender.com/fields-data/1'
        );
        const data = response.data;
        const latestData = data[data.length - 1];
        const initialPhValue = parseFloat(latestData.field1.trim());
        setPhValue(initialPhValue);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  });

  return (
    <React.Fragment>
      <div className="flex flex-col items-center">
        <GaugeComponent
          value={phValue}
          minValue={0}
          maxValue={14}
          type="radial"
          labels={{
            tickLabels: {
              type: 'inner',
              ticks: [
                { value: 1 },
                { value: 2 },
                { value: 3 },
                { value: 4 },
                { value: 5 },
                { value: 6 },
                { value: 7 },
                { value: 8 },
                { value: 9 },
                { value: 10 },
                { value: 12 },
                { value: 13 },
                { value: 14 }
              ]
            },
            valueLabel: {
              style: { fill: '#A3A3A3', border: 'none' }
            }
          }}
          arc={{
            colorArray: ['#FC0424', '#05CCFC', '#FCDC24'],
            subArcs: [{ limit: 6 }, { limit: 8 }, { limit: 14 }],
            padding: 0.05,
            width: 0.3
          }}
          pointer={{
            elastic: true,
            animationDelay: 0
          }}
        />
        <h1 className="text-slate-600 font-semibold tracking-wide">pH</h1>
      </div>
    </React.Fragment>
  );
};

export default PhGauge;
