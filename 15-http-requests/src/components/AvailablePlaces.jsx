import {useEffect, useState} from "react";

import Places from './Places.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isLoading, setIsLoading] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    async function loadPlaces() {
      setIsLoading(true);

      const res = await fetch('http://localhost:3000/places');
      const data = await res.json();

      setAvailablePlaces(data);
      setIsLoading(false);
    }

    loadPlaces();
  }, []);

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
