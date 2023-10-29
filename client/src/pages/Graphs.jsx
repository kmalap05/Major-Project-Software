import React from 'react';
import PhGraph from '../components/Graphs/PhGraph';
import TdsGraph from '../components/Graphs/TdsGraph';
import TurbidityGraph from '../components/Graphs/TurbidityGraph';

const Graphs = () => {
  return (
    <React.Fragment>
      <div className="h-screen p-10">
        <div className="h-full bg-white border shadow-lg rounded-xl flex flex-col items-center">
          <div className="pt-4 grid w-full justify-around overflow-scroll">
            <PhGraph />
            <TdsGraph />
            <TurbidityGraph />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Graphs;
