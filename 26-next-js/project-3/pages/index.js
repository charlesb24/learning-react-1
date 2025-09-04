import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'Meetup 1',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/960px-Stadtbild_M%C3%BCnchen.jpg',
    address: '1 Main Street, 12345 Some City',
    description: 'The First Meetup',
  },
  {
    id: 'm2',
    title: 'Meetup 2',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/960px-Stadtbild_M%C3%BCnchen.jpg',
    address: '2 Main Street, 12345 Some City',
    description: 'The Second Meetup',
  },
];

export default function HomePage({ meetups}) {
  return (
    <>
      <MeetupList meetups={meetups} />
    </>
  );
}

export function getStaticProps() {
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
  };
}