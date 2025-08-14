import { redirect } from 'react-router-dom';

import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request, }) {
  const mode = new URL(request.url).searchParams.get('mode') || 'login';
  const data = await request.formData();

  if (mode !== 'login' && mode !== 'signup') {
    throw new Response(JSON.stringify({ message: 'Unsupported mode.', }), { status: 422 });
  }

  const authData = {
    email: data.get('email'),
    password: data.get('password'),
  };

  const res = await fetch(`http://localhost:8080/${mode}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData),
  });

  if (res.status === 422 || res.status === 401) {
    return res;
  }

  if (!res.ok) {
    throw new Response(JSON.stringify({ message: 'Could not authenticate user.' }), { status: 500 });
  }

  const resData = await res.json();
  const token = resData.token;

  localStorage.setItem('token', token);

  return redirect('/');
}