import NewMeetupForm from '../../components/meetups/NewMeetupForm';

export default function NewMeetupPage() {

  function handleAddMeetup(data) {
    console.log(data);
  }

  return (
    <>
      <NewMeetupForm onAddMeetup={handleAddMeetup} />
    </>
  );
}