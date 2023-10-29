import React, { useEffect, useState } from 'react';
import GaugeComponent from 'react-gauge-component';
import axios from 'axios';

const TdsGauge = () => {
  const [tdsValue, setTDSValue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://environment-monitoring.onrender.com/fields-data/2'
        );
        const data = response.data;
        const latestData = data[data.length - 1];
        const initialTDSValue = parseFloat(latestData.field2.trim());
        setTDSValue(initialTDSValue);
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
          value={tdsValue}
          minValue={0}
          maxValue={1000}
          type="radial"
          labels={{
            tickLabels: {
              type: 'inner',
              ticks: [{ value: 250 }, { value: 500 }, { value: 750 }]
            },
            valueLabel: {
              style: { fill: '#A3A3A3', border: 'none' }
            }
          }}
          arc={{
            colorArray: ['#05CCFC', '#FC544C'],
            subArcs: [{ limit: 150 }, { limit: 1000 }],
            padding: 0.05,
            width: 0.3
          }}
          pointer={{
            elastic: true,
            animationDelay: 0
          }}
        />
        <h1 className="text-slate-600 font-semibold tracking-wide">
          Total Dissolved Salts
        </h1>
      </div>
    </React.Fragment>
  );
};

export default TdsGauge;
