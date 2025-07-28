import { useCallback, useEffect, useState } from 'react';

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || 'Something went wrong, failed to send http request.');
  }

  return responseData;
}

export default function useHttp(url, config, initialData) {
  const [ data, setData ] = useState(initialData);
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState('');

  function clearData() {
    setData(initialData);
  }

  const sendRequest = useCallback(async function(data) {
    setLoading(true);

    try {
      const responseData = await sendHttpRequest(url, { ...config, body: data });

      setData(responseData);
    } catch (error) {
      setError(error.message || 'Something went wrong!');
    }

    setLoading(false);
  }, [url, config]);

  useEffect(() => {
    if ((config && (config?.method === 'GET' || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    loading,
    error,
    sendRequest,
    clearData,
  };
}