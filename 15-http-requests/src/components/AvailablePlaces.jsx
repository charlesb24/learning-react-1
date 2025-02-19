import {useEffect, useState} from "react";

import Places from './Places.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    async function loadPlaces() {
      const res = await fetch('http://localhost:3000/places');
      const data = await res.json();

      setAvailablePlaces(data);
    }

    loadPlaces();
  }, []);

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
