export async function fetchAvailablePlaces() {
  const res = await fetch('http://localhost:3000/places');
  const data = await res.json();

  if (!res.ok) {
    throw new Error('Failed to load places.');
  }

  return data.places;
}

export async function updateUserPlaces(places) {
  const res = await fetch('http://localhost:3000/user-places', {
    method: 'PUT',
    body: JSON.stringify({ places }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error('Failed to update user data.');
  }

  return data.message;
}