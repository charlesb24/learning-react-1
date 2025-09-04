import classes from './MeetupDetails.module.css';

export default function MeetupDetails({ title, description, image, address, }) {
  return (
    <section className={classes.detail}>
      <img src={image} alt={title} />
      <h1>{ title }</h1>
      <address>{ address }</address>
      <p>{ description }</p>
    </section>
  );
}