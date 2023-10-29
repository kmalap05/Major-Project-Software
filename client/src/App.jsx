import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SideBar from './components/SideBar';
import Graphs from './pages/Graphs';
import JsonData from './pages/JsonData';

const App = () => {
  return (
    <React.Fragment>
      <div className="grid grid-cols-5 bg-slate-100">
        <div className="h-screen col-span-1">
          <SideBar />
        </div>
        <div className="col-span-4">
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/graphs" element={<Graphs />} />
            <Route path="/data" element={<JsonData />} />
          </Routes>
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
