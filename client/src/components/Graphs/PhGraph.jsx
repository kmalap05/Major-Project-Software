import axios from 'axios';
import React, { useEffect, useState } from 'react';
import GraphLayout from './GraphLayout';

const fieldIds = [1];

const fetchData = async (fieldId) => {
  const response = await axios.get(
    `https://environment-monitoring.onrender.com/fields-data/${fieldId}`
  );
  return response.data;
};

const initialFieldData = fieldIds.reduce((acc, fieldId) => {
  acc[`field${fieldId}Data`] = [];
  acc[`field${fieldId}Id`] = [];
  return acc;
}, {});

const PhGraph = () => {
  const [fieldData, setFieldData] = useState(initialFieldData);

  useEffect(() => {
    const fetchingData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));

      const fetchPromises = fieldIds.map(async (fieldId) => {
        const response = await fetchData(fieldId);
        const fieldValues = response.map((item) =>
          item[`field${fieldId}`].trim()
        );
        const fieldIdValues = response.map((item) => item.entry_id);
        return {
          fieldId,
          fieldData: fieldValues,
          fieldIdData: fieldIdValues
        };
      });

      const fetchedData = await Promise.all(fetchPromises);

      const updatedData = fetchedData.reduce(
        (acc, { fieldId, fieldData, fieldIdData }) => {
          acc[`field${fieldId}Data`] = fieldData;
          acc[`field${fieldId}Id`] = fieldIdData;
          return acc;
        },
        {}
      );

      setFieldData((prevData) => ({
        ...prevData,
        ...updatedData
      }));
    };

    fetchingData();
  }, []); // Removed fieldData from the dependencies to prevent an infinite loop.

  return (
    <React.Fragment>
      {fieldIds.map((fieldId) => (
        <GraphLayout
          key={fieldId}
          fieldId={fieldData[`field${fieldId}Id`]}
          fieldData={fieldData[`field${fieldId}Data`]}
          fieldName={fieldId === 1 ? 'pH Value' : ''}
          fieldColor={fieldId === 1 ? 'green' : ''}
        />
      ))}
    </React.Fragment>
  );
};

export default PhGraph;
