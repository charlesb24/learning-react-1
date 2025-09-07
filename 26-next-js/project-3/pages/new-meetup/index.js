import { useRouter } from 'next/router';
import Head from 'next/head';

import NewMeetupForm from '../../components/meetups/NewMeetupForm';

export default function NewMeetupPage() {
  const router = useRouter();

  async function handleAddMeetup(data) {
    const res = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const resData = await res.json();

    console.log(resData);

    await router.push('/');
  }

  return (
    <>
      <Head>
        <title>React Meetups | New</title>
        <meta name="description" content="Add your own meetups and create amazing networking opportunities." />
      </Head>
      <NewMeetupForm onAddMeetup={handleAddMeetup} />
    </>
  );
}