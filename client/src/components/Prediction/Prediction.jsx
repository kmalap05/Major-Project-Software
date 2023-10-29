import React, { useEffect, useState } from 'react';
import AnalysisImage from '../../assets/Analysis.jpg';

const Prediction = () => {
  const [phValue, setPhValue] = useState(0);
  const [tdsValue, setTDSValue] = useState(0);
  const [turbidityValue, setTurbidityValue] = useState(0);
  const [isWaterDrinkable, setIsWaterDrinkable] = useState(true);
  // const [showAlert, setShowAlert] = useState(false); // State to control toast visibility

  useEffect(() => {
    // Fetch initial data from APIs
    fetchData();
  }, []);

  const fetchData = () => {
    // Sample function to fetch data from APIs
    fetch('https://environment-monitoring.onrender.com/fields-data/1')
      .then((response) => response.json())
      .then((data) => {
        const latestData = data[data.length - 1];
        const initialPhValue = parseFloat(latestData.field1.trim());
        setPhValue(initialPhValue);
      });

    fetch('https://environment-monitoring.onrender.com/fields-data/2')
      .then((response) => response.json())
      .then((data) => {
        const latestData = data[data.length - 1];
        const initialTDSValue = parseFloat(latestData.field2.trim());
        setTDSValue(initialTDSValue);
      });

    fetch('https://environment-monitoring.onrender.com/fields-data/3')
      .then((response) => response.json())
      .then((data) => {
        const latestData = data[data.length - 1];
        const rawTurbidityValue = latestData.field3;

        if (rawTurbidityValue) {
          const initialTurbidityValue = parseFloat(rawTurbidityValue.trim());
          setTurbidityValue(initialTurbidityValue / 2);
        }
      });
  };

  useEffect(() => {
    // Set up an interval to periodically check for new data
    const interval = setInterval(() => {
      fetchData(); // Fetch new data and update the state
    }, 15000); // Adjust the interval as needed

    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this effect only runs on mount

  useEffect(() => {
    // Implement real-time analysis
    let newIsWaterDrinkable = false;

    if (
      phValue > 6.5 &&
      phValue < 8.5 &&
      tdsValue > 80 &&
      tdsValue < 200 &&
      turbidityValue > 100 &&
      turbidityValue < 1000
    ) {
      newIsWaterDrinkable = true;
    } else {
      newIsWaterDrinkable = false;
      // Show the toast when water is not drinkable
      // setShowAlert(true);
    }
    setIsWaterDrinkable(newIsWaterDrinkable);
  }, [phValue, tdsValue, turbidityValue]);
  return (
    <React.Fragment>
      <div className="flex gap-5">
        <div className="basis-1/2 flex items-center justify-center p-10">
          <img src={AnalysisImage} alt="" className="" />
        </div>
        <div className="basis-2/2 pl-28">
          <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="shadow-xl p-10 rounded-lg border">
              <h1 className="text-2xl font-bold text-slate-700 tracking-tight text-center">
                Water Quality
              </h1>
              <div className="text-xl w-full text-center font-bold text-slate-600">
                {isWaterDrinkable ? (
                  <p className="water">Water Is Drinkable</p>
                ) : (
                  <p className="water">Water Is Not Drinkable</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Prediction;
