import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';

import MeetupDetails from '../../components/meetups/MeetupDetails';
import { MONGO_URL } from '../../mongo-credentials';

export default function MeetupDetailsPage({ meetup }) {
  return (
    <>
      <Head>
        <title>{ `React Meetups | ${meetup.title}` }</title>
        <meta name="description" content={meetup.description} />
      </Head>
      <MeetupDetails
        title={meetup.title}
        description={meetup.description}
        image={meetup.image}
        address={meetup.address}
      />
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(MONGO_URL);
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find({}, {
    _id: 1,
  }).toArray();

  await client.close();

  return {
    fallback: 'blocking', // true -> generate page on missing id, false -> 404 on missing id, blocking -> wait until page is generated before serving
    paths: meetups.map(meetup => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps({ params }) {
  const meetupId = params.meetupId;

  const client = await MongoClient.connect(MONGO_URL);
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  await client.close();

  return {
    props: {
      meetup: {
        id: meetup._id.toString(),
        title: meetup.title,
        description: meetup.description,
        image: meetup.image,
        address: meetup.address,
      },
    },
  };
}