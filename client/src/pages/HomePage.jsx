import React from 'react';
import PhGauge from '../components/Gauges/PhGauge';
import TdsGauge from '../components/Gauges/TdsGauge';
import TurbidityGauge from '../components/Gauges/TurbidityGauge';

const HomePage = () => {
  return (
    <React.Fragment>
      <div className="h-screen p-10">
        <div className="h-full bg-white border shadow-lg rounded-xl flex flex-col items-center">
          <div className="basis-1/3 pt-4 flex w-full justify-around">
            <PhGauge />
            <TdsGauge />
            <TurbidityGauge />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomePage;
