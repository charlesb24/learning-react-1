import {useEffect, useState} from "react";

import Places from './Places.jsx';
import ErrorInfo from "./ErrorInfo.jsx";

import { sortPlacesByDistance } from '../loc.js';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isLoading, setIsLoading] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [errorInfo, setErrorInfo] = useState();

  useEffect(() => {
    async function loadPlaces() {
      setIsLoading(true);

      try {
        const res = await fetch('http://localhost:3000/places');
        const data = await res.json();

        if (!res.ok) {
          throw new Error('Failed to load places.');
        }

        navigator.geolocation.getCurrentPosition((pos) => {
          const sortedPlaces = sortPlacesByDistance(
            data.places,
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

  if (errorInfo) {
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
