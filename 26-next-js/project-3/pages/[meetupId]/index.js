import MeetupDetails from '../../components/meetups/MeetupDetails';

export default function MeetupDetailsPage({ meetup }) {
  return (
    <MeetupDetails
      title={meetup.title}
      description={meetup.description}
      image={meetup.image}
      address={meetup.address}
    />
  );
}

export async function getStaticPaths() {
  return {
    fallback: false, // true -> generate page on missing id, false -> 404 on missing id
    paths: [
      { params: { meetupId: 'm1' } },
      { params: { meetupId: 'm2' } },
    ],
  };
}

export async function getStaticProps({ params }) {
  const meetupId = params.meetupId;

  return {
    props: {
      meetup: {
        title: "First Meetup",
        description: "The First Meetup",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/960px-Stadtbild_M%C3%BCnchen.jpg",
        address: "The Address",
      },
    },
  };
}