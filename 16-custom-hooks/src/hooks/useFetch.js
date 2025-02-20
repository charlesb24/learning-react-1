import {useEffect, useState} from "react";

export default function useFetch(fetchFn, initialValue) {
  const [isLoading, setIsLoading] = useState();
  const [fetchedData, setFetchedData] = useState();
  const [errorInfo, setErrorInfo] = useState(initialValue);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (error) {
        setErrorInfo({ message: error.message || 'Failed to fetch data.' });
      }

      setIsLoading(false);
    }

    fetchData();
  }, [fetchFn]);

  return {
    isLoading,
    fetchedData,
    errorInfo,
  };
}