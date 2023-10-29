import React, { useEffect, useState } from 'react';

const TableData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Define the API URLs
    const apiUrl1 = 'https://environment-monitoring.onrender.com/fields-data/1';
    const apiUrl2 = 'https://environment-monitoring.onrender.com/fields-data/2';
    const apiUrl3 = 'https://environment-monitoring.onrender.com/fields-data/3';

    // Fetch data from the APIs
    const fetchData = async (url) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
        return [];
      }
    };

    const fetchDataFromAPIs = async () => {
      const [data1, data2, data3] = await Promise.all([
        fetchData(apiUrl1),
        fetchData(apiUrl2),
        fetchData(apiUrl3)
      ]);

      // Merge the data from different APIs if needed
      const mergedData = data1.map((item1) => {
        const matchingItem2 = data2.find(
          (item2) => item2.entry_id === item1.entry_id
        );
        const matchingItem3 = data3.find(
          (item3) => item3.entry_id === item1.entry_id
        );

        return {
          ...item1,
          ...(matchingItem2 || {}),
          ...(matchingItem3 || {})
        };
      });

      // Update the 'data' state with the merged data
      setData(mergedData);
    };

    fetchDataFromAPIs();

    // Fetch data initially and then set up a refresh interval (every 15 seconds)
    const refreshInterval = setInterval(fetchDataFromAPIs, 5000);

    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  // Define your table headers
  const headers = ['Timestamp', 'PH Value', 'TDS Value', 'Turbidity Value'];
  const sortedData = [...data].sort((a, b) =>
    b.created_at.localeCompare(a.created_at)
  );
  const groupedData = sortedData.reduce((groups, item) => {
    const date = item.created_at.split('T')[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item);
    return groups;
  }, {});

  return (
    <React.Fragment>
      <div className="h-screen p-10">
        <div className="h-full bg-white border shadow-lg rounded-xl flex flex-col items-center">
          <div className="py-4 px-7 grid w-full overflow-scroll">
            <table className="table-fixed text-center border border-none border-collapse">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>PH Value</th>
                  <th>TDS Value</th>
                  <th>Turbidity Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(groupedData).map(([date, items]) => (
                  <React.Fragment key={date}>
                    <tr>
                      <td
                        className="text-center bg-sky-300"
                        colSpan={headers.length}
                      >
                        <strong className="">Date: {date}</strong>
                      </td>
                    </tr>
                    {items.map((item) => (
                      <tr key={item.entry_id}>
                        <td>{item.created_at}</td>
                        <td>{item.field1}</td>
                        <td>{item.field2}</td>
                        <td>{item.field3}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TableData;
