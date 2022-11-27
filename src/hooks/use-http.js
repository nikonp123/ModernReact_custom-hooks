import { useState } from 'react';

const useHTTP = (requestOptions, manageData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendHttpRequest = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestOptions.url, {
        method: requestOptions.method ? requestOptions.method : 'GET',
        headers: requestOptions.headers ? requestOptions.headers : {},
        body: requestOptions.body ? JSON.stringify(requestOptions.body) : null,
      });

      if (!response.ok) {
        throw new Error('Error request!');
      }

      const data = await response.json();
      manageData(data);
    } catch (err) {
      setError(err.message || 'Something wrong...');
    }
    setIsLoading(false);
  };

  return {
    isLoading,
    error,
    sendHttpRequest,
  };
};

export default useHTTP;
