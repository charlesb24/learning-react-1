import {useRef, useState, useCallback, useEffect} from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import { fetchUserPlaces, updateUserPlaces} from "./http.js";
import ErrorInfo from "./components/ErrorInfo.jsx";

function App() {
  const selectedPlace = useRef();

  const [userPlaces, setUserPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorInfo, setErrorInfo] = useState();

  const [updateError, setUpdateError] = useState();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    async function loadPlaces() {
      setIsLoading(true);

      try {
        const places = await fetchUserPlaces();
        setUserPlaces(places);
      } catch (e) {
        setErrorInfo({ message: e.message || 'Failed to load user places.' });
      }

      setIsLoading(false);
    }

    loadPlaces();
  }, []);

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });

    try {
      await updateUserPlaces([selectedPlace, ...userPlaces]);
    } catch (e) {
      setUserPlaces(userPlaces);
      setUpdateError({
        message: e.message || 'Failed to update places.',
      });
    }
  }

  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    setUserPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
    );

    try {
      await updateUserPlaces(
        userPlaces.filter(place => place.id !== selectedPlace.current.id)
      );
    } catch (e) {
      setUserPlaces(userPlaces);
      setUpdateError({ message: e.message || 'Failed to delete place.' });
    }

    setModalIsOpen(false);
  }, [userPlaces]);

  function handleError() {
    setUpdateError(null);
  }

  return (
    <>
      <Modal open={updateError} onClose={handleError}>
        {updateError && (
          <ErrorInfo
            title="An error occurred"
            message={updateError.message}
            onConfirm={handleError}
          />
        )}
      </Modal>

      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        { errorInfo && <ErrorInfo title="An errror occurred" message={errorInfo.message} /> }
        { !errorInfo && <Places
            title="I'd like to visit ..."
            fallbackText="Select the places you would like to visit below."
            isLoading={isLoading}
            loadingText="Loading user places..."
            places={userPlaces}
            onSelectPlace={handleStartRemovePlace}
          />
        }
        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
