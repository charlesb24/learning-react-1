import {useEffect, useState} from "react";

import Places from './Places.jsx';
import ErrorInfo from "./ErrorInfo.jsx";

import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isLoading, setIsLoading] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [errorInfo, setErrorInfo] = useState({ message: '' });

  useEffect(() => {
    async function loadPlaces() {
      setIsLoading(true);

      try {
        const places = await fetchAvailablePlaces();

        navigator.geolocation.getCurrentPosition((pos) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            pos.coords.latitude,
            pos.coords.longitude
          );

          setAvailablePlaces(sortedPlaces);
          setIsLoading(false);
        });

      } catch (e) {
        setErrorInfo({ message: e.message || 'Could not load places, please try again later.' });
        setIsLoading(false);
      }
    }

    loadPlaces();
  }, []);

  if (errorInfo.message !== '') {
    return (
      <ErrorInfo
        title="An error occurred"
        message={errorInfo.message}
      />
    );
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isLoading}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
