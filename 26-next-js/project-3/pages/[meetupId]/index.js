import MeetupDetails from '../../components/meetups/MeetupDetails';

export default function MeetupDetailsPage() {
  return (
    <MeetupDetails
      title={"First Meetup"}
      description={"The First Meetup"}
      image={"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/960px-Stadtbild_M%C3%BCnchen.jpg"}
      address={"The Address"}
    />
  );
}