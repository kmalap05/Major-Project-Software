import React, { useEffect, useState } from 'react';
import GaugeComponent from 'react-gauge-component';
import axios from 'axios';

const TurbidityGauge = () => {
  const [turbidityValue, setTurbidityValue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://environment-monitoring.onrender.com/fields-data/3'
        );
        const data = response.data;
        const latestData = data[data.length - 1];
        const rawTurbidityValue = latestData.field3;

        if (rawTurbidityValue) {
          const initialTurbidityValue = parseFloat(rawTurbidityValue.trim());
          setTurbidityValue(initialTurbidityValue / 2);
        }
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
          value={turbidityValue}
          minValue={0}
          maxValue={3000}
          type="radial"
          labels={{
            tickLabels: {
              type: 'inner',
              ticks: [
                { value: 500 },
                { value: 1000 },
                { value: 1500 },
                { value: 2000 },
                { value: 2500 }
              ]
            },
            valueLabel: {
              style: { fill: '#A3A3A3', border: 'none' }
            }
          }}
          arc={{
            colorArray: ['#05CCFC', '#FC0424'],
            subArcs: [{ limit: 200 }, { limit: 3000 }],
            padding: 0.05,
            width: 0.3
          }}
          pointer={{
            elastic: true,
            animationDelay: 0
          }}
        />
        <h1 className="text-slate-600 font-semibold tracking-wide">
          Turbidity
        </h1>
      </div>
    </React.Fragment>
  );
};

export default TurbidityGauge;
