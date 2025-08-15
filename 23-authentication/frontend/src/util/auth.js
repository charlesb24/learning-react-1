import { redirect } from 'react-router-dom';

export function getAuthTokenDuration() {
  const storedExpiration = new Date(localStorage.getItem('expiration'));
  const currentTime = new Date();

  return storedExpiration.getTime() - currentTime.getTime();
}

export function getAuthToken() {
  const token = localStorage.getItem('token');
  const tokenDuration = getAuthTokenDuration();

  if (!token) {
    return;
  }

  if (tokenDuration < 0) {
    return 'EXPIRED';
  }

  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

export function authStatusLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect('/auth');
  }

  return null;
}