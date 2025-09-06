import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';
import { MONGO_URL } from '../mongo-credentials';

export default function HomePage({ meetups}) {
  return (
    <>
      <MeetupList meetups={meetups} />
    </>
  );
}

// better for constantly updated data -- runs on every request
// export async function getServerSideProps({ req, res}) {
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

// better for infrequently or predictably updated data -- runs on a schedule
export async function getStaticProps() {
  const client = await MongoClient.connect(MONGO_URL);
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  await client.close();

  return {
    props: {
      meetups: meetups.map(el => ({
        title: el.title,
        image: el.image,
        address: el.address,
        id: el._id.toString(),
      })),
    },
    revalidate: 5,
  };
}