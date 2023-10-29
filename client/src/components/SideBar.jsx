import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { BsGraphUpArrow, BsTable } from 'react-icons/bs';

const SideBar = () => {
  return (
    <React.Fragment>
      <div className="h-screen p-10">
        <div className="h-full bg-white border shadow-lg rounded-xl flex flex-col items-center">
          <div className="basis-1/5">
            <h1 className="pt-10 text-3xl font-bold text-gray-800 tracking-wide">
              Aqualyze
            </h1>
          </div>
          <div className="pt-10 basis-3/5 text-slate-700 font-semibold flex flex-col gap-2">
            <Link to={'/'} className="flex items-center gap-2">
              <AiOutlineHome />
              Homepage
            </Link>
            <Link to={'/graphs'} className="flex items-center gap-2">
              <BsGraphUpArrow />
              Graphs
            </Link>
            <Link to={'/data'} className="flex items-center gap-2">
              <BsTable />
              Data
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SideBar;
